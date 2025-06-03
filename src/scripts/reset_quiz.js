const resetQuiz = () => {
  document.getElementById('score').innerHTML = ''
  game = resetGame()
  promptQuizOptions();
}

const addResetButton = () => {
  const content = document.querySelector('#content');
  const buttonDiv = document.createElement('div')
  buttonDiv.className = 'text-center m-4'
  const button = document.createElement('button')
  button.className = 'btn btn-lg btn-danger'
  button.textContent = 'Reset Quiz'
  button.addEventListener('click', resetQuiz)
  buttonDiv.appendChild(button)
  content.appendChild(buttonDiv)
}
