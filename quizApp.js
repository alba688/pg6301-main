import express from "express";
import bodyParser from "body-parser";
import {randomQuestion, isCorrectAnswer, Questions} from "./questions.js";

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
    const result = isCorrectAnswer(question, answer) ? "correct" : "incorrect";
    res.json({ result });
})