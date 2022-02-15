import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QuizApplication } from "./quizApplication";

ReactDOM.render(
  <BrowserRouter>
    <QuizApplication />
  </BrowserRouter>,
  document.getElementById("app")
);
