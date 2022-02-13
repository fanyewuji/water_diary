const express = require('express');

const router = express.Router();

// @route    GET api/water
// @desc     get drinking water amount for today
// @acess    Private

router.get('/', (req, res) => {
    res.send('Get drinking water amount');
});

// @route    PUT api/water
// @desc     change drinking water amount for today
// @acess    Private

router.put('/', (req, res) => {
    res.send('Change drinking water amount');
});

// @route    GET api/water/all
// @desc     get drinking water amount for each day in the whole year
// @acess    Private

router.get('/all', (req, res) => {
    res.send('Get drinking water amount for each day in the whole year');
});

module.exports = router;