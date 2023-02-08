const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Water = require('../models/Water');

const DEFAULT_GOAL = 2000;
const DEFAULT_CUPSIZE = 250;

// @route    GET api/water
// @desc     get drinking water amount for today
// @acess    Private

router.get('/', auth, async (req, res) => {
    const timeZoneOffset = req.header('x-timezone-offset') || 0;
    const today = new Date(new Date() - timeZoneOffset * 60000).toISOString().substring(0, 10);
    
    try {
        let waterToday = await Water.findOne({ user: req.user.id, date: today });

        if (waterToday) {
            return res.status(200).json(waterToday);
        }

        const recentRecord = await Water.findOne({ user: req.user.id }).sort({ date: -1 });

        let goal = recentRecord ? recentRecord.goal : DEFAULT_GOAL;
        
        let cupSize = recentRecord ? recentRecord.cupSize : DEFAULT_CUPSIZE;
    
        waterToday = new Water({
            user: req.user.id,
            date: today,
            water: 0,
            goal,
            cupSize,
        });
        
        const newWaterRecord = await waterToday.save();
        res.status(200).json(newWaterRecord);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route    PUT api/water
// @desc     change drinking water amount / goal / cupSize for today
// @acess    Private

router.put('/:id', 
    [
        auth,
        oneOf([
            check('water', 'Water amount must be positive').isFloat({ min: 0 }),
            check('goal', 'Water goal must be positive').isFloat({ min: 0 }),
            check('cupSize', 'cupSize must be positive').isFloat({ min: 0 })
        ], 'at least one of water/goal/cupSize should be provided')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status('400').json({ errors: errors.array() });
        }

        if (Object.keys(req.body).length > 1) {
            return res.status(400).json({ msg: 'request body contains more than 1 param' });
        }

        const { water, goal, cupSize } = req.body;

        let updateRecord = {};

        if (water) updateRecord.water = water;
        
        if (goal) updateRecord.goal = goal;

        if (cupSize) updateRecord.cupSize = cupSize;

        try {
            let waterRecord = await Water.findById(req.params.id);

            if (!waterRecord) return res.status(404).json({ msg: 'Record not found' });

            // Make sure user owns the record
            if (waterRecord.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            waterRecord = await Water.findByIdAndUpdate(req.params.id, 
                { $set: updateRecord },
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

router.get('/all', auth, async (req, res) => {
    try {
        const waterRecords = await Water.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(waterRecords);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
});

module.exports = router;