import express from "express";
import { randomQuestion } from "./questions.js";
import bodyParser from "body-parser";
import * as path from "path";

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.resolve("../client/dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.get("/quiz", (req, res, next) => {
  const question = randomQuestion();
  res.json(question);
});

app.post("/quiz", (req, res, next) => {
  res.sendStatus(200);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`started on http://localhost:${server.address().port}`);
});
