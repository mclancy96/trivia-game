const createAndAppendScoreDetail = (parent, detail, detailValue) => {
  const detailEl = document.createElement('p')
  const detailTitleEl = document.createElement('strong')
  detailTitleEl.textContent = detail
  detailEl.appendChild(detailTitleEl)
  const detailValueEl = document.createElement('span')
  detailValueEl.textContent = detailValue
  detailEl.appendChild(detailValueEl)
  parent.appendChild(detailEl)
}

const createAndAppendScoreDetails = (questionSection) => {
  const article = document.createElement('article')
  article.className = 'm-4'
  createAndAppendScoreDetail(article, 'Total Questions: ', game.questionCount)
  createAndAppendScoreDetail(article, 'Correct Answers: ', game.answers.correct)
  createAndAppendScoreDetail(article, 'Incorrect Answers: ', game.answers.incorrect)
  createAndAppendScoreDetail(article, 'Score: ', `${((game.answers.correct / game.questionCount) * 100).toFixed(2)}%`)
  questionSection.appendChild(article)
}

const showEndOfGameSummary = (questionSection) => {
  createAndAppendScoreDetails(questionSection)
  const score = document.getElementById('score')
  score.innerHTML = ''
}
