let timerIntervals = [];

const clearOutIntervals = () => {
  timerIntervals.forEach(timerInterval => clearInterval(timerInterval))
  timerIntervals = []
}

const createWrongInput = () => {
  const answerInputs = document.querySelector('.card-text')
  const copyInputDiv = answerInputs.querySelector('.form-check')
  const badInputDiv = copyInputDiv.cloneNode(true)
  const badInput = badInputDiv.querySelector('input')
  badInput.value = ''
  badInput.checked = true
  badInput.hidden = true
  answerInputs.appendChild(badInput)
}

const submitFormEmpty = () => {
  const form = document.querySelector('form');
  if (form) {
    createWrongInput()
    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
  } else {
    console.error('No form found to submit');
  }
}

const updateTimer = (endTime) => {
  if (game.questionDuration > 0) {
    const timer = document.getElementById('timer')
    const timeLeft = Math.ceil((endTime - Date.now()) / 1000)
    timer.textContent = timeLeft
    if (timeLeft <= 0) {
      clearOutIntervals()
      submitFormEmpty()
    }
  }
}

const getIntenser = () => {
  const thinkAudio = new Audio('sounds/think.mp3')
  thinkAudio.playbackRate = game.questionDuration < 6 ? 1.2 : 1;
  thinkAudio.volume = 1;
  thinkAudio.loop = true
  thinkAudio.play()
  window.thinkAudio = thinkAudio
}

const stopThinkAudio = () => {
  if (window.thinkAudio) {
    window.thinkAudio.pause();
    window.thinkAudio.currentTime = 0;
  }
}

const startTimer = () => {
  if (game.questionDuration > 0) {
    const startTime = Date.now()
    const endTime = startTime + (game.questionDuration * 1000)
    updateTimer(endTime)
    timerIntervals.push(setInterval(() => {
      updateTimer(endTime)
    }, 1000))
  }
}

const initializeTimer = (timerDiv) => {
  timerDiv.innerHTML = ''
  const timerP = document.createElement('p')
  timerP.innerHTML = `Timer: <span id='timer'>${game.questionDuration}</span> seconds`
  timerDiv.appendChild(timerP)
}

const createAndAppendTimer = (questionSession) => {
  if (game.questionDuration > 0) {
    const timerDiv = document.createElement('div')
    timerDiv.className = 'text-center'
    initializeTimer(timerDiv)
    questionSession.appendChild(timerDiv)
  }
}
