const resetQuiz = () => {
  document.getElementById('score').innerHTML = ''
  game = resetGame()
  promptQuizOptions();
}

const addResetButton = () => {
  const container = document.querySelector('#container');
  const buttonDiv = document.createElement('div')
  buttonDiv.className = 'text-center position-absolute bottom-0 start-50 translate-middle-x'
  const button = document.createElement('button')
  button.className = 'btn btn-lg btn-danger'
  button.textContent = 'Reset Quiz'
  button.addEventListener('click', resetQuiz)
  buttonDiv.appendChild(button)
  container.appendChild(buttonDiv)
}
