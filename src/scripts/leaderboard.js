const buildHeaderRow = (leaderboard) => {
  const thead = document.createElement('thead')
  thead.innerHTML = `
    <tr>
      <th scope="col">Score</th>
      <th scope="col">User Name</th>
      <th scope="col">Date</th>
    </tr>
  `
  leaderboard.appendChild(thead)
}

const addTitle = (leaderboard) => {
  const title = document.createElement('h2')
  title.textContent = 'Leaderboard'
  leaderboard.appendChild(title)
}

const addScore = (score, tr) => {
  const th = document.createElement('th')
  th.textContent = `${(score).toFixed(2)}`
  tr.appendChild(th)
}

const addTd = (text, tr) => {
  const td = document.createElement('td')
  td.textContent = `${text}`
  tr.appendChild(td)
}

const buildRow = (score, tbody) => {
  const tr = document.createElement('tr')
  addScore(score.score, tr)
  addTd(score.username, tr)
  addTd(new Date(score.date).toLocaleString('en-US'), tr)
  tbody.appendChild(tr)
}

const buildEmptyRow = (tbody) => {
  const tr = document.createElement('tr')
  const th = document.createElement('th')
  th.textContent = 'No Scores Found'
  th.setAttribute('colspan', 3);
  tr.appendChild(th)
  tbody.appendChild(tr)
}

const buildRows = async (tbody) => {
  const scores = await getScores()
  if (scores.length > 0) scores.forEach(score => buildRow(score, tbody))
  else buildEmptyRow(tbody)
}

const buildBody = (leaderboard) => {
  const tbody = document.createElement('tbody')
  buildRows(tbody)
  leaderboard.appendChild(tbody)
}

const buildOutTable = (leaderboard) => {
  addTitle(leaderboard)
  const tableContainer = document.createElement('div')
  tableContainer.style.maxHeight = '400px'
  tableContainer.style.overflowY = 'auto'
  tableContainer.className = 'p-4 border border-2 border-black rounded-4'
  const table = document.createElement('table')
  table.className = 'table table-bordered'
  buildHeaderRow(table)
  buildBody(table)
  tableContainer.appendChild(table)
  leaderboard.appendChild(tableContainer)
}

const showLeaderboard = () => {
  const content = document.getElementById('content')
  const leaderboard = document.createElement('div')
  leaderboard.className = 'text-center m-4'
  buildOutTable(leaderboard)
  content.prepend(leaderboard)
}
