const parseSelections = (selectedInputs) => {
  let selectedCategories = selectedInputs.filter(input => input.getAttribute('collection') === 'categories').map(input => input.id)
  if (selectedCategories.length < 1) selectedCategories = categories
  let selectedDifficulties = selectedInputs.filter(input => input.getAttribute('collection') === 'difficulties').map(input => input.id)
  if (selectedDifficulties.length < 1) selectedDifficulties = difficulties
  return { selectedCategories, selectedDifficulties }
}

const startQuiz = (submitEvent) => {
  submitEvent.preventDefault()
  console.log('Quiz started')
  const selectedInputs = submitEvent.target.querySelectorAll('input:checked')
  const { selectedCategories, selectedDifficulties } = parseSelections(Array.from(selectedInputs))
  const numberOfQuestions = document.querySelector('#questionsNumber').value
  game.questionDuration = Number.parseInt(document.querySelector('#duration').value)
  fetchAndDisplayQuestions(selectedCategories, selectedDifficulties, numberOfQuestions)
}
