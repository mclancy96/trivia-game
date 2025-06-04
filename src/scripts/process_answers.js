const updateScore = () => {
  const correct = document.getElementById('correct')
  const incorrect = document.getElementById('incorrect')
  const remaining = document.getElementById('remaining')
  correct.textContent = game.answers.correct
  incorrect.textContent = game.answers.incorrect
  remaining.textContent = game.questionCount - game.completedQuestions
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

const showStatus = (status) => {
  const headerBar = document.getElementById('header')
  const statusBar = document.createElement('h4')
  const correctCount = document.getElementById('correct')
  const incorrectCount = document.getElementById('incorrect')
  setHeaderColors(statusBar, headerBar, status, correctCount, incorrectCount)
  headerBar.appendChild(statusBar)
  setTimeout(resetHeader(statusBar, headerBar, status, correctCount, incorrectCount), 2000)
}

const saveAnswer = (questionId, result, selectedAnswer, correctAnswer) => {
  if (result === 'correct') {
    game.answers.correct++
  } else {
    game.answers.incorrect++
  }
  showStatus(result)
  game.completedQuestions++
  game.answers.recordedAnswers[questionId] = { selectedAnswer, correctAnswer }
  updateScore()
}

const recordAnswer = (target, correctAnswer) => {
  const selectedAnswer = target.querySelector('input:checked').value
  const questionId = target.querySelector('input:checked').getAttribute('question')
  if (selectedAnswer === correctAnswer) saveAnswer(questionId, 'correct', selectedAnswer, correctAnswer)
  else saveAnswer(questionId, 'incorrect', selectedAnswer, correctAnswer)
}
