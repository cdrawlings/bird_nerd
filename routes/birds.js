const express = require('express');
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
    try {
        const birds = await Bird.find({user: req.user.id}).lean()
        const location = await Location.findOne({user: req.user.id}).lean();
        let session = await Watch.findById(req.params.id).lean()
        if (!session) {
            return res.render('errors/404')
        }

        if (session.user._id != req.user.id) {
            res.render('errors/404')
        } else {
            res.render('birds/session', {
               session,
                birds,
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
// @route   POST /birds
router.post('/update/:id', ensureAuth, async (req, res) => {
    console.log("req", req.body);
    const update = await Watch.findOneAndUpdate(
        {_id: req.params.id},
        {
            $push: {
                count: {
                    count: req.body.count
                }
            }
        }, {
            new: true,
            upsert: true,
            rawResult: true
        }
    );
    console.log("Update", update);
    res.redirect('/dashboard')

});





module.exports = router
