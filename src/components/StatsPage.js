import React from "react"

export default function StatsPage(props) {
    const message = 
        `You have taken ${props.score[1]/5} quizzes and gotten
        ${props.score[0]}/${props.score[1]} in total (${props.score[0]/props.score[1] * 100}%)`
    return (
        <div className="stats-page--container">
            <h1>All-Time Stats 😎</h1>
            <div>
                <h5>{message}</h5>
            </div>
            <button onClick={props.backToStartPage}>Go back</button>
        </div>
    )
}