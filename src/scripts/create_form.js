const categories = [
  "music",
  "sport_and_leisure",
  "film_and_tv",
  "arts_and_literature",
  "history",
  "society_and_culture",
  "science",
  "geography",
  "food_and_drink",
  "general_knowledge"
];
const difficulties = ['easy', 'medium', 'hard']

const setCheckboxId = (collectionName) => {
  return (item) => {
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" collection='${collectionName.toLowerCase()}' id="${item}">
        <label class="form-check-label" for="${item}">
          ${titleCase(item)}
        </label>
      </div>`
    return div
  }
}

const createAndAppendCheckboxes = (fieldset, collection, collectionName) => {
  const createCheckbox = setCheckboxId(collectionName)
  const newCheckboxes = collection.map(createCheckbox)
  newCheckboxes.forEach(checkbox => fieldset.appendChild(checkbox))
}

const createAndAppendHelper = (helperText, parent) => {
  const helperDiv = document.createElement('div')
  helperDiv.className = "form-text"
  helperDiv.textContent = helperText
  parent.appendChild(helperDiv)
}

const createLegend = (collectionName, fieldset, helperText = '') => {
  const legend = document.createElement('legend')
  legend.innerHTML = `<strong>${collectionName}</strong>`
  legend.className = 'col-form-label-lg text-center'
  fieldset.appendChild(legend)
  if (helperText !== '') {
    createAndAppendHelper(helperText, fieldset)
  }
}

const createAndAppendFieldset = (row, collection, collectionName) => {
  const col = document.createElement('div')
  col.className = 'col border p-2 m-1 border-2 border-dark rounded-3'
  const fieldSet = document.createElement('fieldset')
  fieldSet.className = 'px-3'
  createLegend(collectionName, fieldSet)
  createAndAppendCheckboxes(fieldSet, collection, collectionName)
  col.appendChild(fieldSet)
  row.appendChild(col)
}

const numberOfQuestionsOptions = {
  value: 20,
  name: 'questionsNumber',
  id: 'questionsNumber',
  max: 50,
  min: 1,
}

const durationOptions = {
  value: 0,
  name: 'duration',
  id: 'duration',
  min: 0,
}

const createAndAppendNumInput = (fieldset, options) => {
  const input = document.createElement('input')
  input.className = 'form-control'
  input.type = 'number'
  input.value = options.value
  input.name = options.name
  input.id = options.id
  input.max = options.max
  input.min = options.min
  fieldset.appendChild(input)
}

const createAndAppendNumInputFieldsets = (row) => {
  const col = document.createElement('div')
  col.className = 'col border m-1 p-2 border-2 border-dark rounded-3'
  const fieldSet = document.createElement('fieldset')
  createLegend('Select Number of Questions', fieldSet)
  createAndAppendNumInput(fieldSet, numberOfQuestionsOptions)
  createLegend('Duration of Each Question', fieldSet, 'This is the number of seconds you will have to answer each question. Leave at 0 to have no timer')
  createAndAppendNumInput(fieldSet, durationOptions)
  col.appendChild(fieldSet)
  row.appendChild(col)
}

const createAndAppendRow = (form) => {
  const row = document.createElement('div')
  row.className = 'row container'
  form.appendChild(row)
  return row
}

const createAndAppendStartButton = (form) => {
  const div = document.createElement('div')
  div.className = 'text-center m-4'
  const btn = document.createElement('button')
  btn.type = 'submit'
  btn.className = "btn btn-lg btn-primary text-center"
  btn.textContent = "Start Quiz!"
  div.appendChild(btn)
  form.appendChild(div)
}

const createForm = () => {
  const form = document.createElement('form')
  const row = createAndAppendRow(form)
  createAndAppendFieldset(row, categories, 'Categories')
  createAndAppendFieldset(row, difficulties, 'Difficulties')
  createAndAppendNumInputFieldsets(row)
  createAndAppendStartButton(form)
  form.addEventListener('submit', startQuiz)
  return form
}
