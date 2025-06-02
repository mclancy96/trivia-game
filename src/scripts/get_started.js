const showCategoriesAndDifficulties = () => {
  const container = document.getElementById('container')
  const prompt = document.createElement('p');
  prompt.innerHTML = "Welcome to QuizWhiz!<br>Please select the categories and difficulties you'd \
  like to include for your quiz. Selecting no options for either of the sections will include all of the options."
  prompt.className = 'text-center'
  const form = createForm();
  container.appendChild(prompt)
  container.appendChild(form)
}

const promptQuizOptions = () => {
  const gsButton = document.getElementById('getStarted');
  gsButton.remove();
  showCategoriesAndDifficulties()
}

const getStarted = () => {
  const gsButton = document.getElementById('getStarted');
  gsButton.addEventListener('click', promptQuizOptions)
}
