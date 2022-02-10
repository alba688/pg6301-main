import express from "express";

export const QuizApp = express.Router();

QuizApp.get("/random", (req, res) => {
    res.send("Test random question");
});

QuizApp.post("/answer", (req, res) => {
    res.end();
})