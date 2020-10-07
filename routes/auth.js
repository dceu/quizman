const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User')

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    // res.send('Get logged in user');
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/auth
// @desc    Auth user & get JWT
// @access  Public
router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    // Handle Express Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure user
    const { email, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ msg: 'invalid email' }) }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(400).json({ msg: 'invalid pass' }) }

        // Else make jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        // res.json(user);
        jwt.sign(payload, config.get('jwtSecret'),
            {
                expiresIn: 3600 // an hour
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")

    }

})

module.exports = router;