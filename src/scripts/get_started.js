const game = {
  answers: {
    correct: 0,
    incorrect: 0,
    recordedAnswers: {}
  },
  questionCount: 0
}

const showCategoriesAndDifficulties = () => {
  const content = document.getElementById('content')
  const prompt = document.createElement('p');
  prompt.innerHTML = "<h2>Welcome to QuizWhiz!</h2><br>Please select the categories and difficulties you'd \
  like to include for your quiz. Selecting no options for either of the sections will include all of the options."
  prompt.className = 'text-center'
  const form = createForm();
  content.appendChild(prompt)
  content.appendChild(form)
}

const promptQuizOptions = () => {
  document.getElementById('content').innerHTML = ''
  showCategoriesAndDifficulties()
}

const getStarted = () => {
  const gsButton = document.getElementById('getStarted');
  gsButton.addEventListener('click', promptQuizOptions)
}
