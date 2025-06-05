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

const createAndAppendSaveScore = (questionSection) => {
  const saveDiv = document.createElement('div')
  saveDiv.innerHTML = `
   <h2> Save Score to Leaderboard?</h2>
   <p>Enter you name below to save your score</p>
   <form id='saveScoreForm'>
     <div class="input-group mb-3">
       <input type="text" class="form-control" placeholder="Nihar Patel" aria-label="User's name" aria-describedby="save-score-button" id="username"  required>
       <button class="btn btn-primary" type="submit" id="save-score-button">Save Score</button>
     </div>
   </form>
  `
  questionSection.appendChild(saveDiv)
}

const saveScore = async (submitEvent) => {
  submitEvent.preventDefault()
  const username = document.querySelector('#username')
  document.querySelector('#save-score-button').disabled = true
  await postScore({
    username: username.value,
    date: Date.now(),
    score: game.currentScore
  })
  location.reload()
}

const showEndOfGameSummary = (questionSection) => {
  congratulate()
  createAndAppendScoreDetails(questionSection)
  createAndAppendSaveScore(questionSection)
  document.querySelector('#saveScoreForm').addEventListener('submit', saveScore)
  document.getElementById('score').innerHTML = ''
}

