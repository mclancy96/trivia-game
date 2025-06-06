document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('#logo')
  logo.addEventListener('click', () => {
    reloadLeaderboard()
  })
  showLeaderboard()
  getStarted()
})
