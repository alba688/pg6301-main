import express from "express";
import { randomQuestion } from "./questions.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("../client/dist"));
app.use(bodyParser.json());

app.get("/quiz", (req, res, next) => {
  const question = randomQuestion();
  res.json(question);
});

app.post("/quiz", (req, res, next) => {
  res.sendStatus(401);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`started on http://localhost:${server.address().port}`);
});
