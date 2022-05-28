import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"
import StatsPage from "./components/StatsPage"

import { categories } from "./categories"

export default function App() {
  const [questions, setQuestions] = React.useState([])
  const [pageShown, setPageShown] = React.useState("start")
  const [gameInProgress, setGameInProgress] = React.useState(false)
  const [score, setScore] = React.useState(
    categories.map(category =>
      JSON.parse((localStorage.getItem("category--".concat(category)))) || [0, 0]
    )
  )
  // const [byCategoryScore, setByCategoryScore] = React.useState(
  //   categories.map()
  // )
  
  /* 
  local storage will contain 2-element lists containing the total number
  of correct answers for that category, then the total number of questions
  attempted in the same category
  */
  React.useEffect(() => {
    for (let i = 0; i < 20; i++) {
      localStorage.setItem(
        "category--".concat(categories[i]), JSON.stringify(score[i]))
    }
  }, [score])

  const decodeHTML = html => {
    let areaElement = document.createElement("textarea");
    areaElement.innerHTML = html;
    return areaElement.value;
}

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => data.results)
      .then(questionsArray => questionsArray.map(
        obj => ({
          ...obj,
          question: decodeHTML(obj.question),
          correct_answer: decodeHTML(obj.correct_answer),
          incorrect_answers:
            obj.incorrect_answers.map(answer => decodeHTML(answer)),
          category: obj.category
            .replace("Entertainment: ", "")
            .replace("Science: ", "")})
      ))
      .then(modifiedArray => modifiedArray.map(
        question => ({
          ...question,
          choices: generateChoicesArray(question)
        })
      ))
      .then(newArray => {setQuestions(newArray)})
    setPageShown("quiz")
  }

  const generateChoicesArray = question => {
    const choicesArray = []
    const correctAnswerIndex = Math.floor(Math.random() * 4)
    for (let i = 0; i < 4; i++) {
      let choice
      i == correctAnswerIndex
      ? choice = question.correct_answer
      : choice = question.incorrect_answers[i - (i > correctAnswerIndex)]
      choicesArray.push({
        text: choice,
        selected: false,
        revealed: false,
        correct: choice === question.correct_answer
      })
    }
    return choicesArray
  }

  const revealAnswers = () => {
    setQuestions(prevQuestions => prevQuestions.map(question => ({
      ...question,
      choices: question.choices.map(choice => ({
        ...choice,
        revealed: true
      }))
    })))
    setGameInProgress(false)
  }

  const selectChoice = (currentQuestion, currentChoice) => {
    setQuestions(prevQuestions => prevQuestions.map(question => (
      question.question === currentQuestion
      ? {
          ...question,
          choices: question.choices.map(choice => ({
            ...choice,
            selected: choice.text === currentChoice
          }))
        }
      : question
    )))
  }

  React.useEffect(() => {
    if (!gameInProgress) {
      for (let i = 0; i < questions.length; i++) {
        // let category = questions[i].category
        // var categoryScore = localStorage.getItem(category) || [0, 0]
        let isCorrect = questions[i].choices.filter(
          choice => choice.selected && choice.correct).length
        // localStorage.setItem(
        //   category, [categoryScore[0] + isCorrect, ++categoryScore[1]])
        // localStorage.setItem(
        //   "overall", JSON.stringify(
        //     [overallScore[0] + isCorrect, ++overallScore[1]]))
        setScore(prevScore => {
          var newScore = []
          for (let j = 0; j < 20; j++) {
            if (categories[j] === "Overall") {
              newScore.push([prevScore[j][0] + isCorrect, prevScore[j][1] + 1])
            } else if (categories[j] === questions[i].category) {
              newScore.push([prevScore[j][0] + isCorrect, prevScore[j][1] + 1])
            } else {
              newScore.push(prevScore[j])
            }
          }
          console.log(newScore)
          return newScore
        })
      }
    }
  }, [questions])
  
  var page
  if (pageShown === "start") {
      page = <StartPage
                startQuiz={() => {
                  fetchQuestions();
                  setGameInProgress(true);
                  setPageShown("quiz")
                }}
                viewStats={() => {
                  setPageShown("stats")
                }}/>
  } else if (pageShown === "quiz") {
      page = <QuizPage
                questions={questions}
                revealAnswers={revealAnswers}
                selectChoice={selectChoice}
                gameInProgress={gameInProgress}
                startQuiz={() => {
                  fetchQuestions();
                  setGameInProgress(true);
                  setPageShown("quiz")
                }}
                backToStartPage={() => setPageShown("start")}/>
  } else {
      page = <StatsPage 
      backToStartPage={
        () => {setPageShown("start")}}
      score={score}/>
  }
  return (
    page
  )
}
