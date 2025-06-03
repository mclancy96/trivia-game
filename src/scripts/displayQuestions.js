
const displayQuestions = (questions) => {
  const content = document.getElementById('content')
  content.innerHTML = ''

  questions.forEach(question => {
    const questionDiv = document.createElement('div')
    questionDiv.className = 'question-container'
    questionDiv.innerHTML = `
      <p><strong>Question:</strong> ${question.question.text}</p>
    `
    console.log(question.question)
    content.appendChild(questionDiv)
  })
}
