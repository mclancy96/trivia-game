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
  createAndAppendScoreDetail(article, 'Total Questions: ', game.questionCount)
  createAndAppendScoreDetail(article, 'Correct Answers: ', game.answers.correct)
  createAndAppendScoreDetail(article, 'Incorrect Answers: ', game.answers.incorrect)
  createAndAppendScoreDetail(article, 'Score: ', `${((game.answers.correct / game.questionCount) * 100).toFixed(2)}%`)
  questionSection.appendChild(article)
}

const showEndOfGameSummary = (questionSection) => {
  createAndAppendScoreDetails(questionSection)
}


{/* <article class="score-details">
    <p><strong>Total Questions:</strong> <span id="total-questions">10</span></p>
    <p><strong>Correct Answers:</strong> <span id="correct-answers">8</span></p>
    <p><strong>Incorrect Answers:</strong> <span id="incorrect-answers">2</span></p>
    <p><strong>Score:</strong> <span id="score-percentage">80%</span></p>
  </article>

  <article class="feedback">
    <p id="performance-feedback">Great job! You're a trivia master 🧠</p>
  </article>

  <nav class="summary-actions">
    <button id="play-again">Play Again</button>
    <button id="exit-game">Exit</button>
  </nav> */}
