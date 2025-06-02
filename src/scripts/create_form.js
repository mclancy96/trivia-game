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

const createCheckbox = (item) => {
  const div = document.createElement('div')
  div.innerHTML = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkbox-${item}">
  <label class="form-check-label" for="checkDefault">
    ${titleCase(item)}
  </label>
</div>`
  return div
}

const createAndAppendCheckboxes = (fieldset, collection) => {
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
  createAndAppendCheckboxes(fieldSet, collection)
  col.appendChild(fieldSet)
  row.appendChild(col)
}

const createAndAppendRow = (form) => {
  const row = document.createElement('div')
  row.className = 'row'
  form.appendChild(row)
  return row
}

const createAndAppendSubmitButton = (form) => {
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
  createAndAppendSubmitButton(form)
  form.addEventListener('submit', console.log)
  return form
}
