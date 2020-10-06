const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth')

const Location = require('../models/Location');
const Bird = require('../models/Bird');
const Watch = require('../models/WatchSession');

// @Desc    Login/Landing Page
// @route   GET/
router.get('/', ensureAuth, async (req, res) => {
    const birds = await Bird.find({user: req.user.id}).lean()
    const location = await Location.findOne({user: req.user.id}).lean();
    res.render('birds/index', {
        birds,
        location
    })
});

router.get('/add_birds', ensureAuth, async (req, res) => {
    try {
        const location = await Location.findOne({user: req.user.id}).lean()
        res.render('birds/add_birds', {
            name: req.user.firstName,
            location
        });
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});

// @Desc    Login/Landing Page
// @route   GET/
router.get('/session/:id', ensureAuth, async (req, res) => {
    let idUser = mongoose.Types.ObjectId(req.user.id)
    let idWatch = mongoose.Types.ObjectId(req.params.id)
    try {
        const location = await Location.findOne({user: req.user.id}).lean();
        const session = await Watch.findById(req.params.id).lean()

        const seen = await Bird.aggregate([
            {$project: {comName: 1, speciesCode: 1, count: 1, _id: 1, user: 1}},
            {$match: {user: idUser} },
            {$unwind: '$count'},
            {$match: {'count.watchSession': idWatch} }
        ]);
        const birds = await Bird.aggregate([
            {$project: {name: 1, count: 1, _id: 1, user: 1}},
            {$match: {user: idUser} },
            {$match: {'count.watchSession': {$ne: idWatch}}}
        ]);

        if (!session) {
            return res.render('errors/404')
        }

        if (session.user._id != req.user.id) {
            res.render('errors/404')
        } else {
            res.render('birds/session', {
               session,
                birds,
                seen,
                location
            })
        }
    } catch (err) {
        console.error(err)
        res.render('errors/404')
    }
})




// @desc    Process add form
// @route   POST /birds
router.post('/add_bird', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Bird.create(req.body)
        res.redirect('/add_bird')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});


// @desc    updates session with the new number of birds spotted
// @route   put /birds
router.put('/update/:id', ensureAuth, async (req, res) => {
    const update = await Bird.findOneAndUpdate(
        {"_id": req.body.birdId, "count.watchSession": req.params.id},
        {
            $set: {"count.$.count": req.body.count }
        }, {
            new: true,
            upsert: true,
            rawResult: true
        });

    res.redirect('/birds/session/' + req.params.id)
});



// @desc    Subtracts a bird counted from the session w
// @route   put /birds
router.put('/minus/:id', ensureAuth, async (req, res) => {
    const update = await Bird.findOneAndUpdate(
        {"_id": req.body.birdId, "count.watchSession": req.params.id},
        {
            $set: {"count.$.count": req.body.count }
        }, {
            new: true,
            upsert: true,
            rawResult: true
        });

    res.redirect('/birds/session/' + req.params.id)
});



// @desc    Crestes new spooted bird watch seesion
// @route   put /birds
router.put('/create/:id', ensureAuth, async (req, res) => {
    console.log("req", req.body);
    const update = await Bird.findOneAndUpdate(
        {_id: req.body.birdId},
        {
            $push: {
                count: {
                    count: req.body.count,
                    watchSession: req.params.id
                }
            }
        }, {
            new: true,
            upsert: true,
            rawResult: true
        }
    );
    console.log("Update", update);
    res.redirect('/birds/session/' + req.params.id)

});





module.exports = router
