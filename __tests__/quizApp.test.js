import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import request from "supertest";
import { QuizApp } from "../quizApp.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test secret"));
app.use("/quiz", QuizApp);

describe("The quiz application", () => {
  it("returns a random question", async () => {
    const response = await request.agent(app).get("/quiz/random").expect(200);
    expect(response.body).toMatchSnapshot({
      id: expect.any(Number),
      question: expect.any(String),
      answers: expect.any(Object),
    });
    expect(response.body).not.toHaveProperty("correct_answers");
  });

  it("returns 404 on incorrect question", async () => {
    await request(app).post("/quiz/answer").send({ id: -432 }).expect(404);
  });

  it("responds to correct answers", async () => {
    await request(app)
      .post("/quiz/answer")
      .send({ id: 101, answer: "answer_b" })
      .expect({ result: "correct" });
  });

  it("responds to incorrect answers", async () => {
    await request(app)
      .post("/quiz/answer")
      .send({ id: 101, answer: "answer_d" })
      .expect({ result: "incorrect" });
  });

  it("counts number of right and wrong answers", async () => {
    const agent = request.agent(app);
    await agent.post("/quiz/answer").send({ id: 101, answer: "answer_a" });
    await agent.post("/quiz/answer").send({ id: 102, answer: "answer_a" });
    await agent
      .get("/quiz/score")
      .expect(200)
      .expect({ answered: 2, correct: 1 });
  });
});
