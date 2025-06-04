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

const createLegend = (collectionName, fieldset) => {
  const legend = document.createElement('legend')
  legend.textContent = collectionName
  legend.className = 'col-form-label-lg'
  fieldset.appendChild(legend)
}

const createAndAppendFieldset = (row, collection, collectionName) => {
  const col = document.createElement('div')
  col.className = 'col'
  const fieldSet = document.createElement('fieldset')
  createLegend(collectionName, fieldSet)
  createAndAppendCheckboxes(fieldSet, collection, collectionName)
  col.appendChild(fieldSet)
  row.appendChild(col)
}

const createAndAppendNumInput = (fieldset) => {
  const input = document.createElement('input')
  input.className = 'form-control'
  input.type = 'number'
  input.value = 20
  input.name = 'questionsNumber'
  input.id = 'questionsNumber'
  input.max = 50
  input.min = 1
  fieldset.appendChild(input)
}

const createAndAppendNumInputFieldset = (row) => {
  const col = document.createElement('div')
  col.className = 'col'
  const fieldSet = document.createElement('fieldset')
  createLegend('Select Number of Questions', fieldSet)
  createAndAppendNumInput(fieldSet)
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
  createAndAppendNumInputFieldset(row)
  createAndAppendStartButton(form)
  form.addEventListener('submit', startQuiz)
  return form
}
