const url = 'https://the-trivia-api.com/v2/questions'

const setUrl = (selectedCategories, selectedDifficulties) => {
  return `${url}?limit=20&categories=${selectedCategories.join(',')}&difficulties=${selectedDifficulties.join(',')}`
}

const fetchQuestions = (selectedCategories, selectedDifficulties) => {
  fetch(setUrl(selectedCategories, selectedDifficulties))
    .then(r => r.json())
    .then(displayQuestions)
}

const fetchAndDisplayQuestions = (selectedCategories, selectedDifficulties) => {
  document.getElementById('content').innerHTML = ''
  console.log('starting quiz with the categories:', selectedCategories, 'and the difficulties', selectedDifficulties)
  fetchQuestions(selectedCategories, selectedDifficulties)
}
