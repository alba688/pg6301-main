import express from "express";
import request from "supertest";
import {QuizApp} from "../quizApp.js";

const app = express();
app.use("/quiz", QuizApp);

describe("The quiz application", () => {
   it("returns a random question", async () => {
      const response = await request(app).get("/quiz/random").expect(200);
      expect(response.body).toMatchSnapshot({
         id: expect.any(Number),
         question: expect.any(String),
         answers: expect.any(Object)
      });
   });

   it("responds to correct answers", async () => {
      await request(app)
          .post("/quiz/answer")
          .send({ id: 101, answer: "answer_b"})
          .expect({ result: "correct"});
   })

   it("responds to incorrect answers", async () => {
      await request(app)
          .post("/quiz/answer")
          .send({ id: 101, answer: "answer_d"})
          .expect({ result: "incorrect"});
   })

});