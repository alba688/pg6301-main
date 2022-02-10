import express from "express";
import {randomQuestion} from "./questions.js";

export const QuizApp = express.Router();

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

    res.end();
})