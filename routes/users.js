const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator/check')

// @ route Post api/users
// @ desc Register a user
// @ access Public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more chars').isLength({ min: 6 }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    res.send('Register a user')
})

module.exports = router;