const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @ route Post api/users
// @ desc Register a user
// @ access Public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more chars').isLength({ min: 6 }),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {

        let user = await User.findOne({ email });

        // Check if user already exists
        if (user) {
            return res.status(400).json({ msg: 'User already exists' }); //return if true
        }

        //  Else instantiate new User
        user = new User({
            name,
            email,
            password
        });

        // Encrypt password before passing it to DB
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Pass to db
        await user.save();

        // Make jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600 // an hour
        }), (err, token) => {
            if (err) throw err;
            res.json({ token });
        }

    } catch (err) {
        // make an error handler
        console.error(err.message);
        res.status(500).send("Server Error, see log")

    }
});

module.exports = router;