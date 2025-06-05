const difficultyWeight = (difficulty) => {
  switch (difficulty) {
    case 'hard':
      return 3
    case 'medium':
      return 2
    default:
      return 1
  }
}

const calculateCurrentScore = (difficulty) => {
  const effortWeight = 5 //more competitive = lower weight, more casual = higher weight
  return ((game.answers.correct / game.completedQuestions) * 100 + Math.log(game.completedQuestions + 1) * effortWeight) * difficultyWeight(difficulty).toFixed(2)
}

const updateScoreDisplayed = () => {
  const correct = document.getElementById('correct')
  const incorrect = document.getElementById('incorrect')
  const remaining = document.getElementById('remaining')
  const currentScore = document.getElementById('currentScore')
  correct.textContent = game.answers.correct
  incorrect.textContent = game.answers.incorrect
  remaining.textContent = game.questionCount - game.completedQuestions
  currentScore.textContent = (game.currentScore).toFixed(2)
}

const resetHeader = (statusBar, headerBar, status, correctCount, incorrectCount) => {
  return () => {
    statusBar.remove()
    if (status === 'correct') {
      headerBar.classList.remove('bg-success')
      correctCount.className = 'text-success'
    } else {
      headerBar.classList.remove('bg-danger')
      incorrectCount.className = 'text-danger'
    }
    headerBar.classList.add('bg-dark')
  }
}

const setHeaderColors = (statusBar, headerBar, status, correctCount, incorrectCount) => {
  headerBar.classList.remove('bg-dark')
  if (status === 'correct') {
    correctCount.className = 'text-white'
    headerBar.classList.add('bg-success')
    statusBar.className = 'bg-success text-white'
  } else {
    incorrectCount.className = 'text-white'
    headerBar.classList.add('bg-danger')
    statusBar.className = 'bg-danger text-white'
  }
  statusBar.textContent = titleCase(status)
}

const playFeedback = (status) => {
  status === 'correct' ? playSound('correct.m4a') : playSound('incorrect.m4a')
}

const showStatus = (status) => {
  playFeedback(status)
  const headerBar = document.getElementById('header')
  const statusBar = document.createElement('h4')
  const correctCount = document.getElementById('correct')
  const incorrectCount = document.getElementById('incorrect')
  setHeaderColors(statusBar, headerBar, status, correctCount, incorrectCount)
  headerBar.appendChild(statusBar)
  setTimeout(resetHeader(statusBar, headerBar, status, correctCount, incorrectCount), 2000)
}

const saveAnswerToGameObject = (questionId, result, selectedAnswer, correctAnswer, difficulty) => {
  if (result === 'correct') game.answers.correct++
  else game.answers.incorrect++
  showStatus(result)
  game.completedQuestions++
  game.answers.recordedAnswers[questionId] = { selectedAnswer, correctAnswer }
  game.currentScore = calculateCurrentScore(difficulty)
  updateScoreDisplayed()
}

const recordAnswer = (target, correctAnswer) => {
  const selectedRadio = target.querySelector('input:checked')
  const selectedAnswer = selectedRadio.value
  const questionId = selectedRadio.getAttribute('question')
  const difficulty = selectedRadio.getAttribute('difficulty')
  if (selectedAnswer === correctAnswer) saveAnswerToGameObject(questionId, 'correct', selectedAnswer, correctAnswer, difficulty)
  else saveAnswerToGameObject(questionId, 'incorrect', selectedAnswer, correctAnswer, difficulty)
  return selectedAnswer === correctAnswer
}
