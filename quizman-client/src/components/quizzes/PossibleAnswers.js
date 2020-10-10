import React, { Fragment } from 'react'

const PossibleAnswers = ({ distractors, answer }) => {
    const possibles = [...distractors, answer];


    const shuffle = (possibles) => {
        for (let i = possibles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [possibles[i], possibles[j]] = [possibles[j], possibles[i]]
        }
        return possibles;
    }

    const shuffled = shuffle(possibles);

    return (

        <Fragment>

            {shuffled.map((pos, i) => (
                <p className="text-left">{pos}</p>
            ))}

        </Fragment>

    )
}

export default PossibleAnswers
