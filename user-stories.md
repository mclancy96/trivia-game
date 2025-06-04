# Trivia Game User Stories

## MVP Features

### Feature 1: Start a New Game

#### User Story

As a user, I want to start a new trivia game by selecting a category and difficulty level so that I can play a quiz that matches my interests and skill.

#### Details

Allow users to choose a category (e.g., General Knowledge, Science) and a difficulty (Easy, Medium, Hard). When they click “Start Game”, fetch trivia questions from the Trivia API using those parameters.

---

### Feature 2: Answer Questions with Immediate Feedback

#### User Story

As a user, I want to answer multiple-choice trivia questions so that I can test my knowledge and get instant feedback on my choices.

#### Details

Display one question at a time with four answer options. When the user selects an answer, show whether it was correct or not (e.g., using color or icons), then move to the next question.

---

### Feature 3: Track My Score

#### User Story

As a user, I want to see my current score as I play so that I can keep track of how well I’m doing.

#### Details

Display a live score counter that updates after each question. This can be shown in the corner or header throughout the quiz.

---

### Feature 4: Restart the Quiz

#### User Story

As a user, I want to restart the quiz at any time so that I can try a different category or improve my score.

#### Details

Provide a “Restart Game” button that resets the score and question progress and returns the user to the setup screen.

---

## Stretch Goals

---

### Feature 5: Timed Questions

#### User Story

As a user, I want to answer questions under a time limit so that I can challenge myself to think quickly.

#### Details

Add a countdown timer (e.g., 15 seconds) per question. If time runs out, auto-mark the answer as incorrect and move on.

---

### Feature 6: High Score Tracking

#### User Story

As a user, I want to save my highest score so that I can try to beat it in future games.

#### Details

Use localStorage to remember the best score and display it next to the current score.

---

### Feature 7: End-of-Game Summary

#### User Story

As a user, I want to see a summary of my performance at the end of the quiz so that I can reflect on how well I did.

#### Details

After the last question, show a results screen with:

- Total questions answered
- Number correct
- Percentage correct
- Option to restart

---

### Feature 8: Allow Choice of Number of Questions

#### User Story

As a user, I want to be able to select the number of questions that will be included in the quiz so that I can have more or less questions in the quiz if desired

#### Details

At the start of the quiz, there will be a new input that allows users to enter a number that will represent the number of questions that will be asked during the quiz
