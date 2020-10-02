const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User')

// @route   GET api/users
// @desc    Get logged in user
// @access  Private
router.get('/', async (req, res) => {
    // res.send('Get logged in user');
    try {
        // const user = await User.findByID(req.user.id).select('-password');
        // res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   POST api/users
// @desc    Auth user & get JWT
// @access  Public

// router.post('/', [
//validator params
//], async (req, res) => {
//
// }

module.exports = router;