import React, { useReducer } from 'react';
import uuid from 'uuid';
import QuizContext from './QuizContext'
import QuizReducer from './QuizReducer'
import {
    ADD_QUIZ,
    DELETE_QUIZ,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_QUIZ,
    FILTER_QUIZZES,
    CLEAR_FILTER
} from '../types'

const QuizState = props => {
    const initialState = {
        quizzes: [
            {
                id: 1,
                title: 'Demo Quiz 1',
                questions: [
                    {
                        question: 'This is a demo question',
                        distractors: [
                            "this is a distractor",
                            "this is also a distractor",
                        ],
                        answer: "this is the answer"
                    }
                ],
                date: Date.now()
            },
            {
                id: 2,
                title: 'Demo Quiz 2',
                questions: [
                    {
                        question: 'This is a demo question',
                        distractors: [
                            "this is a distractor",
                            "this is also a distractor",
                        ],
                        answer: "this is the answer"
                    },
                    {
                        question: 'How many questions does this quiz have?',
                        distractors: [
                            "7",
                            "0",
                            "8",
                            "-2"
                        ],
                        answer: "2"
                    }
                ],
                date: Date.now()
            },
            {
                id: 3,
                title: 'Demo Quiz 3',
                questions: [
                    {
                        question: 'This is a demo question',
                        distractors: [
                            "this is a distractor",
                            "this is also a distractor",
                        ],
                        answer: "this is the answer"
                    }
                ],
                date: Date.now()
            }
        ]
    };

    const [state, dispatch] = useReducer(QuizReducer, initialState);

    //  ADD QUIZ
    //  DELETE QUIZ
    //  SET CURRENT QUIZ
    //  CLEAR Current
    //  UPDATE QUIZ
    //  FILTER Quiz
    //  CLEAR Quiz

    return (
        <QuizContext.Provider
            value={{
                quizzes: state.quizzes,
                // quiz: state.quiz,
            }}
        >
            {props.children}
        </QuizContext.Provider>
    )
};

export default QuizState;