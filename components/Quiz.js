import { useState, useEffect } from "react";

import styles from "../styles/App.module.css";

import Question from "../components/Question";

export default function Quiz(amount, category, difficulty) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const result = await fetch(
        `https://opentdb.com/api.php?encode=base64&amount=${amount}&category=${category}&difficulty=${difficulty}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.results);
          setQuestions(data.results);
        })
        .catch((err) => {
          console.error("Error:", err);
          setHasError(false);
        });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>{questions[questionNumber].category}</h2>
      <p>{questions[questionNumber].difficulty}</p>
      {loading ? (
        <div>Loading...</div>
      ) : hasError ? (
        <div>Error occured.</div>
      ) : questionNumber <= questions.length ? (
        <Question
          key={questionNumber}
          number={questionNumber + 1}
          correct_answer={questions[questionNumber].correct_answer}
          incorrect_answers={questions[questionNumber].incorrect_answers}
          question={questions[questionNumber].question}
          incrementScore={() => setScore(score + 1)}
          nextQuestion={nextQuestion}
        />
      ) : (
        <div>bye</div>
      )}
    </>
  );
}
