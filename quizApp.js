import express from "express";
import bodyParser from "body-parser";
import { randomQuestion, isCorrectAnswer, Questions } from "./questions.js";

export const QuizApp = express.Router();
QuizApp.use(bodyParser.json());

QuizApp.get("/random", (req, res) => {
  // res.send("Test random question");
  const { id, question, answers } = randomQuestion();
  res.json({ id, question, answers });
});

QuizApp.post("/answer", (req, res) => {
  // read body as json
  // check if answer is correct or incorrect
  // set a cookie
  // read cookie in /score
  const { id, answer } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answered: 0, correct: 0 };
  score.answered += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: "correct" });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: "incorrect" });
  }
});

QuizApp.get("/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answered: 0, correct: 0 };
  res.send(score);
});
