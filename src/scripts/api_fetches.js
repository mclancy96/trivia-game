const url = 'https://the-trivia-api.com/v2/questions'

const setUrl = (selectedCategories, selectedDifficulties) => {
  return `${url}?limit=20&categories=${selectedCategories.join(',')}&difficulties=${selectedDifficulties.join(',')}&region=US`
}

const fetchQuestions = (selectedCategories, selectedDifficulties) => {
  fetch(setUrl(selectedCategories, selectedDifficulties))
    .then(r => r.json())
    .then(displayQuestions)
}

const fetchAndDisplayQuestions = (selectedCategories, selectedDifficulties) => {
  document.getElementById('content').innerHTML = ''
  fetchQuestions(selectedCategories, selectedDifficulties)
}
