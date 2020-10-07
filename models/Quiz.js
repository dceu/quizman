const mongoose = require('mongoose')

const QuizSchema = mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    },
    questions: [
        {
            question: String,
            distractors: [{ type: String }],
            answer: String
        }
    ]
});

module.exports = mongoose.model('quiz', QuizSchema);