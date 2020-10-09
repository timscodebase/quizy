import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

// FinalScore Styles
import { FinalScore, Title } from "./styles/QuizStyles";

import shuffle from "../lib/shuffle";

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
          console.log("Shuffle:", shuffle(data.results));
          setQuestions(shuffle(data.results));
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
          <Title difficulty={questions[questionNumber].difficulty}>
            <div className="info">
              <h2>{questions[questionNumber].category}</h2>
              <h3>
                Question {questionNumber + 1} of {questions.length}
              </h3>
            </div>
            <div className="difficulty">
              <p>{questions[questionNumber].difficulty}</p>
            </div>
          </Title>
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
