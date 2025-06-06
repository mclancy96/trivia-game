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
  const escapedAnswer = answer.replace(/"/g, '&quot;');
  answerRadio.innerHTML = `
    <input class="form-check-input" type="radio" name="answerRadio" difficulty="${difficulty}" question="${questionIndex}" id="${answerIndex}" required value="${escapedAnswer}">
    <label class="form-check-label" for="${answerIndex}">
      ${answer}
    </label>
  `
  questionRadiosDiv.appendChild(answerRadio)
}

const createAndAppendAnswerRadios = (answers, questionForm, questionIndex, difficulty) => {
  const questionRadiosDiv = document.createElement('div')
  questionRadiosDiv.className = 'card-text text-start'
  questionRadiosDiv.style.width = '200px';
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
  card.className = `card border-${difficultyStyling(difficulty)} border-2 rounded-4 bg-${difficultyStyling(difficulty)}-subtle`
  card.style.width = '500px'
  const body = document.createElement('div')
  body.className = 'card-body d-flex flex-column justify-content-center align-items-center'
  card.appendChild(body)
  form.appendChild(card)
  return body
}

const createAndAppendAnswerForm = (question, questionIndex, questions, answers, correctAnswer) => {
  const questionForm = document.createElement('form')
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
