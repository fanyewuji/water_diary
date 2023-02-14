require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route    GET api/auth
// @desc     get logged in user
// @acess    Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }   catch (err) {
        console.error(err.message);
        res.status.send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Auth user and get token
// @acess    Public

router.post('/',
    [        
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password must have 6 or more characters').exists().isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status('400').json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                process.env.jwtSecret, 
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server Error'});
        }
});

module.exports = router;