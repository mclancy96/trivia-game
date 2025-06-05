# 🎮 QuizWhiz Trivia Game

**QuizWhiz** is a fast-paced, browser-based trivia game that lets players test their knowledge across various categories and difficulty levels. Built using [The Trivia API](https://the-trivia-api.com/docs/v2/), the game provides instant feedback, real-time scoring, and an engaging user experience.

<img width="1463" alt="Screenshot 2025-06-05 at 08 31 36" src="https://github.com/user-attachments/assets/7298877f-c331-460a-ad70-7bf18eb6a886" />

---

## 🚀 Project Pitch


### 🧠 The Story

In just three days, I set out to build an interactive quiz game that brings fun, fast, and challenging trivia to your fingertips. Users select a topic and difficulty, then dive into a series of questions with instant feedback and score tracking. Simple to play, hard to master.

---

## 🔑 Core Features (MVP)

- 🎯 **Choose Your Game**Select from multiple trivia categories and difficulty levels before starting the quiz.
- ❓ **Multiple-Choice Questions**Answer one question at a time, with instant visual feedback (correct/incorrect).
- 🧮 **Live Score Tracking**Your score updates after each answer, giving you immediate performance feedback.
- 🔄 **Restart Quiz Anytime**
  Easily start over with a new game by clicking the "Restart" button.

---

## 🧰 Tech & API Integration

### 📡 API Used

- [The Trivia API](https://the-trivia-api.com/docs/v2/)
  - **Endpoint:** `https://the-trivia-api.com/api/questions`
  - **Parameters:**
    - `categories` (e.g., "general_knowledge", "science")
    - `limit` (e.g., 10 questions)
    - `difficulty` (easy, medium, hard)

### 🛠 Tools

- HTML / CSS / JavaScript (Vanilla JS)
- LocalStorage or JSON-Server (for stretch goal: high score tracking)

---

## 🧪 Stretch Goals

- ⏱ **Timed Questions** – 15-second countdown per question
- 🏆 **High Score Tracking** – Best score saved via `localStorage`
- 📊 **End-of-Game Summary** – Final stats shown at the end of quiz
- ⌨️ **Keyboard Navigation** – Answer questions using arrow keys and Enter

---

## 🧩 Anticipated Challenges

- **Handling API Response Variability:** Formatting trivia questions and shuffling answers consistently
- **Time Constraints:** Limited to 3 days, so focus will remain on core game loop and polish
- **State Management:** Ensuring score, progress, and quiz reset behavior works without bugs

---

## 🧠 Future Enhancements

- Multiplayer mode
- Leaderboards
- Sound effects and animations
- Category-based performance history

---

## 📂 Project Setup

```bash
git clone git@github.com:mclancy96/trivia-game.git
cd trivia-game
open index.html
```
