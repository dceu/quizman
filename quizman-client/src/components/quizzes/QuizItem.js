import React, { Fragment } from 'react'

// import { Link } from 'react-router-dom'
// import Quiz from './Quiz';
import PossibleAnswers from './PossibleAnswers'

const QuizItem = ({ quiz }) => {
    const { id, title, questions, date } = quiz;


    return (
        <Fragment>


            <div className='card bg-primary'>
                <h3 className="text-center">{title}</h3>
                <ul>
                    {questions.map((question, index) =>
                        (<li className='card bg-light'>

                            <h4 className="text-primary text-left">
                                {question.question} <i className="fas fa-question" />
                            </h4>
                            <PossibleAnswers
                                key={index}
                                distractors={question.distractors}
                                answer={question.answer} />
                        </li>)


                    )}
                </ul>



            </div>
        </Fragment>
    )
}

export default QuizItem;