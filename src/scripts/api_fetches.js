const url = 'https://the-trivia-api.com/v2/questions'

const setUrl = (selectedCategories, selectedDifficulties, numberOfQuestions = 20) => {
  return `${url}?limit=${numberOfQuestions === '' ? 20 : numberOfQuestions}&categories=${selectedCategories.join(',')}&difficulties=${selectedDifficulties.join(',')}&region=US`
}

const fetchQuestions = (selectedCategories, selectedDifficulties, numberOfQuestions) => {
  fetch(setUrl(selectedCategories, selectedDifficulties, numberOfQuestions))
    .then(r => r.json())
    .then(displayQuestions)
}

const fetchAndDisplayQuestions = (selectedCategories, selectedDifficulties, numberOfQuestions = 20) => {
  document.getElementById('content').innerHTML = ''
  fetchQuestions(selectedCategories, selectedDifficulties, numberOfQuestions)
}
