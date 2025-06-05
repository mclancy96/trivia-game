const playSound = (sound) => {
  const thinkAudio = new Audio(`sounds/${sound}`)
  thinkAudio.volume = 1;
  thinkAudio.play()
}

const congratulate = () => {
  const result = game.answers.correct / game.questionCount
  if (result > .95) {
    playSound('nice.mp3')
  } else if (result > .85) {
    playSound('pretty_good.mp3')
  } else if (result > .75) {
    playSound('not_bad.mp3')
  } else if (result > .65) {
    playSound('not_great.mp3')
  } else if (result > .55) {
    playSound('oof.mp3')
  } else if (result > .45) {
    playSound('oooof.mp3')
  } else {
    playSound('wasted.mp3')
  }
}

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
  article.className = 'm-4 border border-2 p-3'
  createAndAppendScoreDetail(article, 'Total Questions: ', game.questionCount)
  createAndAppendScoreDetail(article, 'Correct Answers: ', game.answers.correct)
  createAndAppendScoreDetail(article, 'Incorrect Answers: ', game.answers.incorrect)
  createAndAppendScoreDetail(article, 'Percentage Correct: ', `${((game.answers.correct / game.questionCount) * 100).toFixed(2)}%`)
  createAndAppendScoreDetail(article, 'Elapsed Time: ', `${(((Date.now() - game.quizStarted) / 1000) / 60).toFixed(2)} minutes`)
  createAndAppendScoreDetail(article, 'Overall Score: ', `${(game.currentScore).toFixed(2)}`)
  questionSection.appendChild(article)
}

const showEndOfGameSummary = (questionSection) => {
  congratulate()
  createAndAppendScoreDetails(questionSection)
  const score = document.getElementById('score')
  score.innerHTML = ''
}

