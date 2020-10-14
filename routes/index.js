const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Location = require('../models/Location');
const Watch = require('../models/WatchSession');
const Bird = require('../models/Bird');

// @Desc    Login/Landing Page
// @route   GET/
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: "login"
    })
});

// @Desc    Login/Landing Page
// @route   GET/
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const location = await Location.findOne({user: req.user.id}).lean();
        const session = await Watch.findById(req.params.id).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            location
        });
    } catch (err) {
            console.error(err);
            res.render('errors/500');
    }
});



// @Desc    Get chart information
// @route   GET/ chart
router.get('/chart', ensureAuth, async (req, res) => {
    let idUser = mongoose.Types.ObjectId(req.user.id)
    // let idWatch = mongoose.Types.ObjectId(req.params.id)
    try {
        const location = await Location.findOne({user: req.user.id}).lean();
        const session = await Watch.findById(req.params.id).lean()

        const last = await Bird.aggregate([

            {$match: {user: idUser} },
            {$unwind: '$count'},
            {$project: {comName: 1, speciesCode: 1, count: 1, _id: 1, user: 1}},
            {$lookup: {
                    from:"WatchSession",
                    localField: "count.watchSession",
                    foreignField: "_id",
                    as: "watch"
                }},


            // {$match: {'count.watchSession': idWatch} }
        ]);


        res.render('chart', {
            name: req.user.firstName,
            location,
            last
        });

        console.log("Last try: ", last)

    } catch (err) {
        console.error(err);
        res.render('errors/500');
    }
});







// @desc    Gets the users location
// @route   POST / location
router.post('/add_location', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Location.create(req.body)
        res.redirect('dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});


// @desc    Gets the users location
// @route   POST / Session start
router.post('/start', ensureAuth, async (req, res) => {
    try {
        let session = new Watch();
        session.user = req.user.id;
        session.tempature = req.body.tempature;
        session.condition = req.body.condition;
        session.local = req.body.local;
        console.log(session)
        session.save(function(err, start) {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Saved: ", start.id)
            }
        });
        res.redirect('birds/session/' + session.id)
        console.log("session: ", session.id)
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});

module.exports = router