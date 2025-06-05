const localUrl = 'http://localhost:3000/scores'

const getScores = async () => {
  const r = await fetch(localUrl)
  const scores = await r.json()
  return scores.sort((a, b) => b.score - a.score) 
}

const createPostOptions = (scoreObj) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(scoreObj)
  }
}

const postScore = async (scoreObj) => {
  const r = await fetch(localUrl, createPostOptions(scoreObj))
  return await r.json()
}
