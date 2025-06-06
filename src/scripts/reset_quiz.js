const resetQuiz = () => {
  document.getElementById('score').innerHTML = ''
  game = resetGame()
  stopThinkAudio();
  promptQuizOptions();
  clearOutIntervals();
}

const createAndAppendResetButton = (buttonDiv) => {
  const button = document.createElement('button')
  button.className = 'btn btn-lg btn-danger m-1'
  button.textContent = 'Restart Quiz'
  button.addEventListener('click', resetQuiz)
  buttonDiv.appendChild(button)
}

const createAndAppendHomeButton = (buttonDiv) => {
  const button = document.createElement('button')
  button.className = 'btn btn-lg btn-info m-1'
  button.textContent = 'Go Home'
  button.addEventListener('click', () => reloadLeaderboard())
  buttonDiv.appendChild(button)
}

const addResetButton = () => {
  const container = document.querySelector('#container');
  const buttonDiv = document.getElementById('resetButton')
  buttonDiv.className = 'text-center position-absolute bottom-0 start-50 translate-middle-x py-2 btn-group'
  createAndAppendHomeButton(buttonDiv)
  createAndAppendResetButton(buttonDiv)
  container.appendChild(buttonDiv)
}
