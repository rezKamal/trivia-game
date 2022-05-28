import React from "react"
import { categories } from "../categories"

export default function StatsPage(props) {

    const [bestCategory, setBestCategory] = React.useState("")
    const [worstCategory, setWorstCategory] = React.useState("")

    React.useEffect(() => {
        const newArray = props.score.map(
            category => (category[0] / category[1]) || 0)
        setBestCategory(categories[newArray.indexOf(Math.max(...newArray))])
        setWorstCategory(categories[newArray.indexOf(Math.min(...newArray))])
    }, [])
    const message = props.score[0][1] === 0
    ? `You haven't taken a quiz yet!`
    :   `You have taken ${props.score[0][1]/5} quizzes and gotten
        ${props.score[0][0]}/${props.score[0][1]} in total
        (${(props.score[0][0]/props.score[0][1] * 100).toFixed(0)}%)`
    const message2 = props.score[0][1] > 0 && 
        `You seem to do best on questions related to ${bestCategory}
        and worst on questions related to ${worstCategory}`

    return (
        <div className="stats-page--container">
            <h1>All-Time Stats 😎</h1>
            <div>
                <h5>{message}</h5>
                <h5>{message2}</h5>
            </div>
            <button onClick={props.backToStartPage}>Go back</button>
        </div>
    )
}