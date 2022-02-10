import express from "express";
import {QuizApp} from "./quizApp.js";

const app = express();
app.use("/quiz", QuizApp);

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(
        `started on http://localhost:${server.address().port}`
    );
});