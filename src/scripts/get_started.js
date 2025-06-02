// const title = document.getElementById('title');
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
    ${item}
  </label>
</div>`
  return div
}

const createAndAppendCheckboxes = (fieldset, collection) => {
  const newCheckboxes = collection.map(createCheckbox)
  newCheckboxes.forEach(checkbox => fieldset.appendChild(checkbox))
}

const createAndAppendFieldset = (form, collection, collectionName) => {
  const fieldSet = document.createElement('fieldset')
  const legend = document.createElement('legend')
  legend.textContent = collectionName
  fieldSet.appendChild(legend)
  createAndAppendCheckboxes(fieldSet, collection)
  form.appendChild(fieldSet)
}

const createForm = () => {
  const form = document.createElement('form')
  createAndAppendFieldset(form, categories, 'Categories')
  createAndAppendFieldset(form, difficulties, 'Difficulties')
  form.addEventListener('submit', console.log)
  return form
}

const showCategoriesAndDifficulties = () => {
  const container = document.getElementById('container')
  const prompt = document.createElement('p');
  prompt.textContent = "Welcome to QuizWhiz!\nPlease select the categories and difficulties you'd \
  like to include for your quiz. Select no options to include all"
  const form = createForm();
  container.appendChild(form)
}

const promptQuizOptions = () => {
  const gsButton = document.getElementById('getStarted');
  gsButton.remove();
  showCategoriesAndDifficulties()
}

const getStarted = () => {
  const gsButton = document.getElementById('getStarted');
  gsButton.addEventListener('click', promptQuizOptions)
}
