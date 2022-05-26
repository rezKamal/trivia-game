import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"

export default function App() {
  const [showStartPage, setShowStartPage] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [gameInProgress, setGameInProgress] = React.useState(false)

  const decodeHTML = html => {
    let areaElement = document.createElement("textarea");
    areaElement.innerHTML = html;
    return areaElement.value;
}

  const fetchQuestions = () => {
    setShowStartPage(false)
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => data.results)
      .then(questionsArray => questionsArray.map(
        obj => ({
          ...obj,
          question: decodeHTML(obj.question),
          correct_answer: decodeHTML(obj.correct_answer),
          incorrect_answers:
            obj.incorrect_answers.map(answer => decodeHTML(answer))})
      ))
      .then(modifiedArray => modifiedArray.map(
        question => ({
          ...question,
          choices: generateChoicesArray(question)
        })
      ))
      .then(newArray => {setQuestions(newArray)})
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
  
  const page = showStartPage
    ? <StartPage startQuiz={() => {
        fetchQuestions();
        setGameInProgress(true)
      }}/>
    : <QuizPage
      questions={questions}
      revealAnswers={revealAnswers}
      selectChoice={selectChoice}
      gameInProgress={gameInProgress}
      startQuiz={() => {
        fetchQuestions();
        setGameInProgress(true)
      }}
      backToStartPage={() => setShowStartPage(true)}/>
  
  return (
    page
  )
}
