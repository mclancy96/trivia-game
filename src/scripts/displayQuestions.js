const setNextQuestion = (questions, questionIndex, correctAnswer) => {
  return (submitEvent) => {
    submitEvent.preventDefault();
    if (timerIntervals.length > 0) clearOutIntervals()
    recordAnswer(submitEvent.target, correctAnswer)
    showCurrentQuestion(questions, questionIndex + 1)
  }
}

const createAndAppendQuestionAnswerRadios = (answer, questionRadiosDiv, answerIndex, questionIndex, difficulty) => {
  const answerRadio = document.createElement('div')
  answerRadio.className = "form-check"
  answerRadio.innerHTML = `
    <input class="form-check-input" type="radio" name="answerRadio" difficulty="${difficulty}" question="${questionIndex}" id="${answerIndex}" required value="${answer}">
    <label class="form-check-label" for="${answerIndex}">
      ${answer}
    </label>
  `
  questionRadiosDiv.appendChild(answerRadio)
}

const createAndAppendAnswerRadios = (answers, questionForm, questionIndex, difficulty) => {
  const questionRadiosDiv = document.createElement('div')
  questionRadiosDiv.className = 'card-text px-5 my-2 text-start'
  answers.forEach((answer, answerIndex) => createAndAppendQuestionAnswerRadios(answer, questionRadiosDiv, answerIndex, questionIndex, difficulty))
  questionForm.appendChild(questionRadiosDiv)
}

const difficultyStyling = (difficulty) => {
  switch (difficulty) {
    case 'hard':
      return 'danger'
    case 'medium':
      return 'warning'
    default:
      return 'success'
  }
}

const createAndAppendQuestionTitle = (question, questionIndex, questionForm, difficulty) => {
  const questionTitle = document.createElement('h5')
  questionTitle.className = "card-title text-center"
  questionTitle.textContent = `${Number.parseInt(questionIndex) + 1}. ${question.question.text}`
  questionForm.appendChild(questionTitle)
  const difficultyDisplay = document.createElement('p')
  difficultyDisplay.className = `card-title text-center text-${difficultyStyling(difficulty)}`
  difficultyDisplay.textContent = `Difficulty: ${titleCase(difficulty)}`
  questionForm.appendChild(difficultyDisplay)
}

const createAndAppendQuestionSubmitButton = (questionForm) => {
  const button = document.createElement('div')
  button.className = 'text-center'
  button.innerHTML = `<button class="btn btn-lg btn-primary" type="submit">Submit Answer</button>`
  questionForm.appendChild(button)
}

const createAndAppendCardFormat = (form, difficulty) => {
  const card = document.createElement('div')
  card.className = `card w-75 border-${difficultyStyling(difficulty)} border-2 rounded-4`
  const body = document.createElement('div')
  body.className = 'card-body'
  card.appendChild(body)
  form.appendChild(card)
  return body
}

const createAndAppendAnswerForm = (question, questionIndex, questions, answers, correctAnswer) => {
  const questionForm = document.createElement('form')
  questionForm.className = 'd-flex flex-column justify-content-center align-items-center'
  const cardBody = createAndAppendCardFormat(questionForm, question.difficulty)
  createAndAppendQuestionTitle(question, questionIndex, cardBody, question.difficulty)
  createAndAppendAnswerRadios(answers, cardBody, questionIndex, question.difficulty)
  createAndAppendQuestionSubmitButton(cardBody)
  const checkAnswerAndDisplayNextQuestion = setNextQuestion(questions, questionIndex, correctAnswer)
  questionForm.addEventListener('submit', checkAnswerAndDisplayNextQuestion)
  return questionForm
}

const displayQuestion = (question, questionIndex, questions) => {
  const questionSection = document.getElementById('question')
  let answers = [question.correctAnswer, ...question.incorrectAnswers]
  answers = shuffle(answers)
  createAndAppendTimer(questionSection)
  const questionForm = createAndAppendAnswerForm(question, questionIndex, questions, answers, question.correctAnswer)
  questionSection.appendChild(questionForm)
  startTimer()
}

const displayScoreSection = () => {
  const score = document.getElementById('score')
  const scoreDisplay = document.createElement('div')
  scoreDisplay.innerHTML = `
   <h5> Correct: <span id='correct' class='text-success'>0</span>  Incorrect: <span id='incorrect' class='text-danger'>0</span>  Remaining: <span id='remaining'>${game.questionCount - game.completedQuestions}</span> Current Score: <span id='currentScore'>${game.answers.correct * game.completedQuestions}</span></h5>
  `
  score.appendChild(scoreDisplay)
}

const setupQuizStructure = () => {
  const content = document.getElementById('content')
  const question = document.createElement('div')
  question.id = 'question'
  content.appendChild(question)
  displayScoreSection()
  addResetButton()
}

const generateResponse = () => {
  const score = (game.answers.correct / game.questionCount) * 100;
  let range = "";
  if (score < 10) range = "0-9";
  else if (score < 20) range = "10-19";
  else if (score < 30) range = "20-29";
  else if (score < 40) range = "30-39";
  else if (score < 50) range = "40-49";
  else if (score < 60) range = "50-59";
  else if (score < 70) range = "60-69";
  else if (score < 80) range = "70-79";
  else if (score < 90) range = "80-89";
  else if (score < 100) range = "90-99";
  else range = "100";

  const options = triviaFeedback[range];
  return options[Math.floor(Math.random() * options.length)];
}

const showCurrentQuestion = (questions, currentQuestionIndex) => {
  const questionSection = document.getElementById('question');
  if (currentQuestionIndex < questions.length) {
    questionSection.innerHTML = ''
    displayQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions);
  } else {
    clearOutIntervals()
    stopThinkAudio()
    questionSection.innerHTML = `<h2 class='text-center'><strong>GAME OVER</strong></h2><p class='m-4 lead'>${generateResponse()}</p>`;
    showEndOfGameSummary(questionSection)
  }
};

const beginQuestionLoop = (questions) => {
  if (game.questionDuration > 0) getIntenser()
  if (questions && questions.length > 0) {
    showCurrentQuestion(questions, 0)
  }
}

const displayQuestions = (questions) => {
  game.questionCount = questions.length
  const content = document.getElementById('content')
  content.innerHTML = ''
  setupQuizStructure()
  beginQuestionLoop(questions)
}

const triviaFeedback = {
  "0-9": [
    "Well... you showed up, and that's half the battle. Right? Right??",
    "Your brain might still be asleep. Try again after coffee! ☕",
    "Did you just click answers with your eyes closed? 🫣",
    "Even random guesses would've scored higher. Impressive in its own way!",
    "Statistically improbable. Are you a performance artist? 🎭",
    "That was bold. Not *correct*, but bold.",
    "Were you just stress-testing the wrong answers?",
    "You missed 100% of the questions you answered. Now that's consistency!",
    "It's not about winning. It's about... well okay, it *is* about winning.",
    "Plot twist: this was a reverse trivia test. You nailed it!"
  ],
  "10-19": [
    "Hey, at least you didn't get a zero. Participation points! 🏅",
    "You've got potential! It's... deeply buried, but it's there!",
    "The effort is there, the answers—less so.",
    "Don't worry, trivia isn't everything. Except in this game.",
    "A humble start to a glorious trivia journey. 🚶",
    "Not great, not awful—just a lukewarm trivia soup. 🍲",
    "You're just getting warmed up! Or... cooling down?",
    "Did you answer based on vibes? Because I respect that. ✨",
    "You definitely knew *something*. Unfortunately, not any of these.",
    "Your trivia skills are in stealth mode. Ninja-level invisibility. 🥷"
  ],
  "20-29": [
    "You're like a trivia boomerang—mostly spinning wildly, but coming back with a few answers!",
    "Some sparks of knowledge—just keep the fire going! 🔥",
    "You tried. The trivia gods acknowledge your effort. 🛐",
    "Clearly, you knew *something*! Probably. Maybe.",
    "Hey, you beat your pet goldfish's high score! 🐠",
    "Look at you! Getting at least some answers!",
    "Your brain was buffering. Try again after a refresh. 🔄",
    "If trivia were darts, you hit the wall near the board. 🎯",
    "You're starting to smell like potential... or is that popcorn? 🍿",
    "You've reached 'kind of knows stuff' status. Embrace it."
  ],
  "30-39": [
    "You know things! Just not *these* things.",
    "You're circling the realm of 'decent'—keep going!",
    "Trivia apprentice in training. Sensei would be proud!",
    "You've got a foot in the door. The wrong door, but still!",
    "You're on the verge of something great… maybe next time.",
    "Your brain is in early spring bloom. 🌸",
    "A third of the way to legend! Or 2/3 of the way to guessing.",
    "A strong bronze medal... if this were a two-person race.",
    "You're making trivia waves—small, silly ones. 🌊",
    "Almost there. Like, if 'there' was still kinda far."
  ],
  "40-49": [
    "Almost halfway! Like climbing a trivia mountain in flip-flops. 🩴",
    "The answers were close. You were closer to clicking the right ones!",
    "Hey, not bad! You're in the murky middle zone!",
    "Halfway to glory, halfway to confusion!",
    "Next time, trust your gut—or a Magic 8 Ball. 🎱",
    "You're flirting with mediocrity in the most charming way!",
    "Trivia tip: sometimes the *wrong* answer is a vibe. 😎",
    "Solidly 'not embarrassing,' which is a win in itself!",
    "Trivia is a journey. You're on a local bus route, but you're moving!",
    "You're building momentum. It's like trivia cardio. 🏃"
  ],
  "50-59": [
    "Solidly average! And that's not a bad thing! 👍",
    "You've achieved the golden middle—like trivia oatmeal.",
    "Not bad, not great—just comfortably medium. 🛋️",
    "You're lukewarm genius material!",
    "That's a coin toss away from greatness!",
    "Congrats! You're smarter than half the imaginary players!",
    "You're not just average—you're *delightfully* average.",
    "Glass half full... of kinda-right answers. 🥛",
    "Middle of the road? Sure. But that's where highways are.",
    "Hey, you passed! If this were a pass/fail course. (It's not.)"
  ],
  "60-69": [
    "Okay smarty pants, you're starting to cook! 👖🔥",
    "You've got facts. You've got flair. Just a little more fire!",
    "This is where things start getting impressive!",
    "Your trivia muscles are flexing hard! 💪",
    "You're not just guessing anymore—you're educated guessing!",
    "You are the trivia storm before the perfect score. ⛈️",
    "Solid work! A little polishing and you're a quiz ninja.",
    "You're in the top tier of the middle tier!",
    "You are now eligible for the semi-smart club. 🧠",
    "Your score smells like potential with a sprinkle of spice. 🌶️"
  ],
  "70-79": [
    "Now we're talking! You almost aced this thing. 🥳",
    "Trivia warrior detected. Battle well fought!",
    "You're dangerously close to 'that person at pub quiz.' 🍻",
    "Big brain moments were had. And seen. And celebrated. 🧠✨",
    "You're a walking Wikipedia. Just slightly out of date. 📚",
    "This wasn't luck. This was 70% brilliance!",
    "You probably read *some* of the textbook in school. 😏",
    "Your brain is doing squats. Gains incoming. 🏋️",
    "You crushed most of it. The rest? Minor details.",
    "The quiz didn't know what hit it. Almost."
  ],
  "80-89": [
    "Whoa, look at you go! 🏎️",
    "Trivia royalty. We're not worthy! 👑",
    "You're one lightning bolt away from genius. ⚡",
    "S-tier smarts. Slightly scary, mostly impressive.",
    "You've clearly memorized the internet. Nice.",
    "Your mind is a steel trap—with glitter. ✨",
    "You're a certified brainiac. The certificate is imaginary, though.",
    "Did you eat a textbook for breakfast?",
    "You might be a trivia bot. We're investigating. 🤖",
    "If trivia were an Olympic sport, you'd be podium-adjacent!"
  ],
  "90-99": [
    "Wow, okay, we see you! 🥇",
    "You absolutely crushed it. We're applauding IRL. 👏",
    "Are you sure you're not secretly an AI?",
    "That was amazing. Like, spooky amazing. 👻",
    "The trivia stars aligned in your brain galaxy. 🌌",
    "You didn't just ace it, you sent it to space. 🚀",
    "Quiz legend in the making!",
    "Almost perfect! Like, dangerously close!",
    "You might be part trivia wizard. 🧙",
    "Call the knowledge police—someone's brain is *too* big!"
  ],
  "100": [
    "Perfection! You are the trivia overlord. 👑",
    "Every answer right?? Are you magic?! 🪄",
    "Flawless victory! Mortal Kombat voice not included. 🎮",
    "You're a trivia unicorn. Rare, majestic, unstoppable. 🦄",
    "A perfect 100! Even your calculator's impressed. 🧮",
    "You didn't play the quiz. You *conquered* it.",
    "Brain.exe has achieved god mode. 💻✨",
    "You win the internet for today. Use it wisely.",
    "No notes. 10/10. Chef's kiss. 👨‍🍳💋",
    "Legend status unlocked. Wear it with pride!"
  ]
};
