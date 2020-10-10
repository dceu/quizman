import React, { Fragment, useContext } from 'react'
import QuizItem from './QuizItem'
import QuizContext from '../../context/Quiz/QuizContext'

const Quizzes = () => {
    const quizContext = useContext(QuizContext);

    const { quizzes } = quizContext;

    return (
        <Fragment>
            {quizzes.map(quiz => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </Fragment>
    )
}

export default Quizzes
