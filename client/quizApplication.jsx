import React, { useContext, useState } from "react";

import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { randomQuestion, isCorrectAnswer } from "../server/questions.js";

export const QuestionContext = React.createContext({ randomQuestion });

export function FrontPage({ totalAnswered, correctAnswer }) {
  return (
    <div>
      <h1>The Quiz Application</h1>
      <p data-testid={"status"}>
        Your score: {correctAnswer} correct of {totalAnswered}
      </p>
      <Link to={"/quiz"}>
        <button>Take new quiz</button>
      </Link>
    </div>
  );
}

export function ShowQuestion({ setTotalAnswered, setCorrectAnswer }) {
  const { randomQuestion } = useContext(QuestionContext);
  const [question] = useState(randomQuestion());
  const navigate = useNavigate();

  function handleAnswer(a) {
    setTotalAnswered((count) => count + 1);
    if (isCorrectAnswer(question, a)) {
      setCorrectAnswer((count) => count + 1);
      navigate("/answer/correct");
    } else {
      console.log("wrong");
      navigate("/answer/wrong");
    }
  }

  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((a) => (
          <p key={a} data-testid={a}>
            <button onClick={() => handleAnswer(a)}>
              {question.answers[a]}
            </button>
          </p>
        ))}
    </div>
  );
}

function AnswerPage() {
  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong. Try again.</h1>} />
      </Routes>
      <div>
        <Link to={"/"}>Back</Link>
      </div>
    </div>
  );
}

export function QuizApplication() {
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            totalAnswered={totalAnswered}
            correctAnswer={correctAnswer}
          />
        }
      />
      <Route
        path={"/quiz"}
        element={
          <ShowQuestion
            setTotalAnswered={setTotalAnswered}
            setCorrectAnswer={setCorrectAnswer}
          />
        }
      />
      <Route path={"/answer/*"} element={<AnswerPage />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
