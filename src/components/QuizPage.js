import React from "react"

import Question from "./Question"

export default function QuizPage(props) {
    const computeScore = () => {
        return props.questions.filter(question => {
            for (let i = 0; i < 4; i++) {
                if (question.choices[i].text === question.correct_answer &&
                    question.choices[i].selected) {
                    return true
                }
            }
            return false
        }).length
    }

    const message = {
        0: "better luck next time!",
        1: "sheesh! That's tough",
        2: "not too bad!",
        3: "pretty decent!",
        4: "nice!",
        5: "way to go!"
    }
    const bottomOfPage =
    props.gameInProgress
    ? <button onClick={props.revealAnswers}>Check answers</button>
    :   <div className="play--again">
            <h4>{`${computeScore()}/5, ${message[computeScore()]}`}</h4>
            <button
                onClick={props.startQuiz}>Play again?</button>
            <button onClick={props.backToStartPage}>Go back</button>
        </div>

    return (
        <div className="quiz-page--container">
            <br/><br/>
            {props.questions.map(question =>
                <div key={question.question} className="question--wrapper">
                    <Question {...question} selectChoice={props.selectChoice}/>
                </div>
            )}
            {bottomOfPage}
        </div>
    )
}