const updateScore = () => {
  const correct = document.getElementById('correct')
  const incorrect = document.getElementById('incorrect')
  const remaining = document.getElementById('remaining')
  correct.textContent = game.answers.correct
  incorrect.textContent = game.answers.incorrect
  remaining.textContent = game.questionCount - game.completedQuestions
}

const showStatus = (status) => {
  const headerBar = document.getElementById('header')
  const statusBar = document.createElement('h4')
  statusBar.className = status === 'correct' ? 'text-success' : 'text-danger'
  statusBar.textContent = titleCase(status)
  headerBar.appendChild(statusBar)
  setTimeout(() => statusBar.remove(), 3000)
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
