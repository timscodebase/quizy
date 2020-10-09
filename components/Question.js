import { useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";

// Library Functions
import shuffle from "../lib/shuffle";

// Custom Functions
import Correct from "../components/Correct";
import Incorrect from "../components/Incorrect";

const StyledQuestion = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1em;
  position: relative;
  border: 1px solid var(--border);
  border-radius: 4px;

  h3 {
    margin-bottom: 0.5em;
  }

  .label {
    display: block;
    position: relative;
    width: 100%;
    padding: 0.5em;
    padding-left: 1rem;
    margin-bottom: 0.5em;
    user-select: none;
    cursor: pointer;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: linear-gradient(
      135deg,
      rgba(219, 219, 219, 0) 0%,
      rgba(150, 150, 150, 0.25) 100%
    );
  }
  .label:hover,
  .label .checkbox:checked ~ .label {
    font-weight: 600;
    color: var(--accent-color);
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(243, 0, 61, 0.25) 100%
    );
  }

  .checkbox {
    display: none;
  }
`;

export default function Question({
  correct_answer,
  incorrect_answers,
  question,
  incrementScore,
  nextQuestion,
}) {
  const [isCorrect, setIsCorrect] = useState(null);

  const displayIfCorrect = (isCorrect) => {
    if (isCorrect != null) {
      if (isCorrect) return <Correct />;
      return <Incorrect />;
    } else {
      return null;
    }
  };

  // Un-shuffled Answers
  const answers = incorrect_answers.concat(correct_answer);
  // Shuffled Answers
  const shuffledAnswers = shuffle(answers);

  return (
    <StyledQuestion>
      {displayIfCorrect(isCorrect)}
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          if (values.answer[0] === correct_answer) {
            incrementScore();
            setIsCorrect(true);
            setTimeout(() => {
              nextQuestion();
            }, 800);
          } else {
            setIsCorrect(false);
            setTimeout(() => {
              nextQuestion();
            }, 800);
          }
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <form>
            <h3>{question}</h3>
            <div role="group" aria-labelledby="checkbox-group">
              {shuffledAnswers.map((answer) => (
                <label
                  key={answer}
                  className="label"
                  onChange={props.handleSubmit}
                >
                  <Field
                    type="checkbox"
                    className="checkbox"
                    name="answer"
                    value={answer}
                  />
                  {answer}
                </label>
              ))}
            </div>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          </form>
        )}
      </Formik>
    </StyledQuestion>
  );
}
