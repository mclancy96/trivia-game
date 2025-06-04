const startTimer = () => {
  if (game.questionDuration > 0) {
    // set timer to duration
    // start counting down
    // trigger submission when timer reaches 0
  }
}

const setTimerTime = (timerDiv) => {
  const timerP = document.createElement('p')
  timerP.innerHTML = `Timer: <span id='time'>${game.questionDuration}</span> seconds`
  timerDiv.appendChild(timerP)
}

const createAndAppendTimer = (questionSession) => {
  if (game.questionDuration > 0) {
    const timerDiv = document.createElement('div')
    timerDiv.className = 'text-center'
    setTimerTime(timerDiv)
    questionSession.appendChild(timerDiv)
  }
}
