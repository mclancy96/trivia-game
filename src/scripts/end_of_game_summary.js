const playSound = (sound) => {
  const thinkAudio = new Audio(`sounds/${sound}.mp3`)
  thinkAudio.volume = 1;
  thinkAudio.play()
}

const congratulate = () => {
  const result = game.answers.correct / game.questionCount
  if (result > .95) {
    playSound('nice')
  } else if (result > .85) {
    playSound('pretty_good')
  } else if (result > .75) {
    playSound('not_bad')
  } else if (result > .65) {
    playSound('not_great')
  } else if (result > .55) {
    playSound('oof')
  } else if (result > .45) {
    playSound('oooof')
  } else {
    playSound('wasted')
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
  article.className = 'm-4'
  createAndAppendScoreDetail(article, 'Total Questions: ', game.questionCount)
  createAndAppendScoreDetail(article, 'Correct Answers: ', game.answers.correct)
  createAndAppendScoreDetail(article, 'Incorrect Answers: ', game.answers.incorrect)
  createAndAppendScoreDetail(article, 'Score: ', `${((game.answers.correct / game.questionCount) * 100).toFixed(2)}%`)
  createAndAppendScoreDetail(article, 'Elapsed Time: ', `${(((Date.now() - game.quizStarted) / 1000) / 60).toFixed(2)} minutes`)
  questionSection.appendChild(article)
}

const showEndOfGameSummary = (questionSection) => {
  congratulate()
  createAndAppendScoreDetails(questionSection)
  const score = document.getElementById('score')
  score.innerHTML = ''
}

