const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Story = require('../models/Story')
const Location = require('../models/Location');
const Watch = require('../models/WatchSession');

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
        const stories = await Story.find({user: req.user.id}).lean();
        const location = await Location.findOne({user: req.user.id}).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
            location
        });
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
