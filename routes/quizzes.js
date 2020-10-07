const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User')
const Quiz = require('../models/Quiz')

// /////////////////////////////////////////////
//  @route      GET api/quizzes
//  @desc       GET all users Quizzes
//  @access     Private
router.get('/', auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ author: req.user.id }).sort({ date: -1 })
        res.json({ quizzes });
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})


///////////////////////////////////////////////
//  @route      POST api/quizzes
//  @desc       Add new quiz
//  @access     Private
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // make sure questions format are consistent with model
    const { title, questions } = req.body;

    try {

        const newQuiz = new Quiz({
            title,
            author: req.user.id,
            questions
        })

        const quiz = await newQuiz.save();
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
})

///////////////////////////////////////////////
//  @route      PUT api/quizzes/:id
//  @desc       Update quiz
//  @access     Private
router.put('/:id', auth, async (req, res) => {

    // be sure to match questions format with nested Object struct
    // defined in schema
    const { title, questions } = req.body;
    const quizFields = {};


    if (title) quizFields.title = tite;
    if (questions) quizFields.questions = questions;

    try {
        let question = await Quiz.findById(req.params.id);

        if (!quiz) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user is not author of quiz
        if (quiz.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true });
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')


    }
})

///////////////////////////////////////////////
//  @route      DELETE api/quizzes/:id
//  @desc       Delete a quiz
//  @access     Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let question = await Quiz.findById(req.params.id);

        if (!quiz) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user is author not of quiz
        if (quiz.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Quiz.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Quiz Removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')


    }
})

module.exports = router;
