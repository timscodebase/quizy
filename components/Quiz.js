import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";

const FinalScore = styled.p`
  margin: -5px 0;
  color: ${(props) =>
    props.score < 60
      ? "var(--primary-color)"
      : props.score < 80
      ? "var(--warning-color)"
      : "var(--success-color)"};
  font-weight: bold;
  font-size: ${(props) =>
    props.score < 70 ? "3em" : props.score < 90 ? "3.5em" : "4em"};

  @supports (-webkit-text-stroke: 1px black) {
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
    -webkit-text-fill-color: ${(props) =>
      props.score < 60
        ? "var(--primary-color)"
        : props.score < 80
        ? "var(--warning-color)"
        : "var(--success-color)"};
  }
`;

import Question from "../components/Question";

export default function Quiz({ amount, category, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
  console.log(url);

  function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      // Starting fetch
      setLoading(true);
      const result = await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.results);
          setQuestions(data.results);
        })
        .catch((err) => {
          console.error("Error:", err);
          setHasError(false);
        });
      // Done fetching
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <BounceLoader />
      ) : hasError ? (
        <div>Error occured.</div>
      ) : questionNumber < questions.length ? (
        <>
          <h2>{questions[questionNumber].category}</h2>
          <h3>
            Question {questionNumber + 1} of {questions.length}
          </h3>
          <p>{questions[questionNumber].difficulty}</p>
          <Question
            key={questionNumber}
            correct_answer={questions[questionNumber].correct_answer}
            incorrect_answers={questions[questionNumber].incorrect_answers}
            question={questions[questionNumber].question}
            incrementScore={() => setScore(score + 1)}
            nextQuestion={nextQuestion}
          />
        </>
      ) : questionNumber >= questions.length ? (
        <div>
          <h2>All Done!</h2>
          <h3>Here is your final score</h3>
          <FinalScore score={(score / questions.length) * 100}>
            {(score / questions.length) * 100}%
          </FinalScore>
        </div>
      ) : null}
    </>
  );
}
