const nextQuestion = () => {
  console.log('going to next question')
}

const recordAnswer = () => {
  //TODO record correct/incorrect
  //clear question section
}

const setNextQuestion = (questions, questionIndex) => {
  return (submitEvent) => {
    submitEvent.preventDefault();
    recordAnswer()
    showCurrentQuestion(questions, questionIndex + 1)
  }
}

const createAndAppendQuestionAnswerRadios = (answer, questionRadiosDiv, answerIndex) => {
  const answerRadio = document.createElement('div')
  answerRadio.className = "form-check"
  answerRadio.innerHTML = `
    <input class="form-check-input" type="radio" name="answerRadio" id="${answerIndex}">
    <label class="form-check-label" for="${answerIndex}">
      ${answer}
    </label>
  `
  questionRadiosDiv.appendChild(answerRadio)
}

const createAndAppendAnswerRadios = (answers, questionForm) => {
  const questionRadiosDiv = document.createElement('div')
  questionRadiosDiv.className = 'card-text px-5 my-2'
  answers.forEach((answer, answerIndex) => createAndAppendQuestionAnswerRadios(answer, questionRadiosDiv, answerIndex))
  questionForm.appendChild(questionRadiosDiv)
}

const createAndAppendQuestionTitle = (question, questionIndex, questionForm) => {
  const questionTitle = document.createElement('h5')
  questionTitle.className = "card-title text-center"
  questionTitle.textContent = `${Number.parseInt(questionIndex) + 1}. ${question.question.text}`
  questionForm.appendChild(questionTitle)
}

const createAndAppendQuestionSubmitButton = (questionForm) => {
  const button = document.createElement('div')
  button.className = 'text-center'
  button.innerHTML = `<button class="btn btn-lg btn-primary" type="submit">Submit Answer</button>`
  questionForm.appendChild(button)
}

const createAndAppendCardFormat = (form) => {
  const card = document.createElement('div')
  card.className = 'card w-75'
  const body = document.createElement('div')
  body.className = 'card-body'
  card.appendChild(body)
  form.appendChild(card)
  return body
}

const createAndAppendAnswerForm = (question, questionIndex, questions, answers) => {
  const questionForm = document.createElement('form')
  questionForm.className = 'd-flex flex-column justify-content-center align-items-center'
  const cardBody = createAndAppendCardFormat(questionForm)
  createAndAppendQuestionTitle(question, questionIndex, cardBody)
  createAndAppendAnswerRadios(answers, cardBody)
  createAndAppendQuestionSubmitButton(cardBody)
  const checkAnswerAndDisplayNextQuestion = setNextQuestion(questions, questionIndex)
  questionForm.addEventListener('submit', checkAnswerAndDisplayNextQuestion)
  return questionForm
}

const displayQuestion = (question, questionIndex, questions) => {
  const questionSection = document.getElementById('question')
  let answers = [question.correctAnswer, ...question.incorrectAnswers]
  answers = shuffle(answers)
  const questionForm = createAndAppendAnswerForm(question, questionIndex, questions, answers)
  questionSection.appendChild(questionForm)
}

const displayScoreSection = () => {
  const score = document.getElementById('score')
  const p = document.createElement('p')
  p.textContent = 'SCORE SECTION (to be filled in with next pr)'
  p.className = 'bg-light text-black'
  score.appendChild(p)
}

const setupScoreSection = () => {
  const score = document.createElement('div')
  score.id = 'score'
  document.getElementById('header').append(score)
}

const setupQuizStructure = () => {
  const content = document.getElementById('content')
  const question = document.createElement('div')
  question.id = 'question'
  content.appendChild(question)
  setupScoreSection()
  displayScoreSection()
}

const showCurrentQuestion = (questions, currentQuestionIndex) => {
  const questionSection = document.getElementById('question');
  if (currentQuestionIndex < questions.length) {
    questionSection.innerHTML = ''
    displayQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions);
  } else {
    questionSection.innerHTML = '<h2>Quiz Complete!</h2>';
  }
};

const beginQuestionLoop = (questions) => {
  if (questions && questions.length > 0) {
    showCurrentQuestion(questions, 0)
  }
}

const displayQuestions = (questions) => {
  const content = document.getElementById('content')
  content.innerHTML = ''
  setupQuizStructure()
  beginQuestionLoop(questions)
}
