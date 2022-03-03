const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Water = require('../models/Water');

// @route    GET api/water
// @desc     get drinking water amount for today
// @acess    Private

router.get('/', auth, async (req, res) => {
    const today = new Date().toISOString().substring(0, 10);

    try {
        let waterToday = await Water.findOne({ user: req.user.id, date: today });

        if (waterToday) {
            return res.status(200).json(waterToday);
        }
    
        waterToday = new Water({
            user: req.user.id,
            date: today,
            water: 0
        });
        
        const newWaterRecord = await waterToday.save();
        res.status(200).json(newWaterRecord);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route    PUT api/water
// @desc     change drinking water amount for today
// @acess    Private

router.put('/:id', 
    [
        auth,
        check('water', 'Water amount must be positive').isFloat({ min: 0 })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status('400').json({ errors: errors.array() });
        }

        const { water } = req.body;

        try {
            let waterRecord = await Water.findById(req.params.id);

            if (!waterRecord) return res.status(404).json({ msg: 'Record not found' });

            // Make sure user owns the record
            if (waterRecord.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            waterRecord = await Water.findByIdAndUpdate(req.params.id, 
                { $set: { water }},
                { new: true }
            );
            
            res.status(200).json(waterRecord);

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server Error' });
        }
});

// @route    GET api/water/all
// @desc     get drinking water amount for each day in the whole year
// @acess    Private

router.get('/all', (req, res) => {
    res.send('Get drinking water amount for each day in the whole year');
});

module.exports = router;