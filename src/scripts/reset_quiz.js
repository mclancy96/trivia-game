const resetQuiz = () => {
  document.getElementById('score').innerHTML = ''
  game = resetGame()
  promptQuizOptions();
}

const createAndAppendResetButton = (buttonDiv) => {
  const button = document.createElement('button')
  button.className = 'btn btn-lg btn-danger'
  button.textContent = 'Restart Quiz'
  button.addEventListener('click', resetQuiz)
  buttonDiv.appendChild(button)
}

const addResetButton = () => {
  const container = document.querySelector('#container');
  const buttonDiv = document.getElementById('resetButton')
  buttonDiv.className = 'text-center position-absolute bottom-0 start-50 translate-middle-x py-2'
  createAndAppendResetButton(buttonDiv)
  container.appendChild(buttonDiv)
}
