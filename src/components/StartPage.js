import React from "react"

export default function StartPage(props) {
    return (
        <div className="start-page--container">
            <h1>Quizzical</h1>
            <h3>Test your trivia knowledge!</h3>
            <button onClick={props.startQuiz}>Start quiz</button>
            <h4 style={{bottom: "5%",
            position: "fixed",
            textAlign: "center",
            width: "100%"}}>Implemented from scratch with inspiration from <a href="https://www.figma.com/file/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0%3A1">this UI</a> ❤️</h4>
        </div>
    )
}