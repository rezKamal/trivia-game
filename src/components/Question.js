import React from "react"
import ReactDOM from "react-dom"

import Choice from "./Choice"

export default function Question(props) {
    const choices = props.choices.map(choice => 
        <Choice
            text={choice.text}
            selected={choice.selected}
            revealed={choice.revealed}
            correct={choice.correct}
            selectChoice={() => props.selectChoice(props.question, choice.text)}/>
    )

    return (
        <div className="question--wrapper">
            <h2>{props.question}</h2>
            <div className="choices--wrapper">
                {choices}
            </div>
        </div>
    )
}