import { useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";

import Correct from "../components/Correct";
import Incorrect from "../components/Incorrect";

const StyledQuestion = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 3rem 1em 1em 1em;
  position: relative;
  border: 1px solid var(--border);
  border-radius: 4px;

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
  number,
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

  const answers = incorrect_answers.concat(correct_answer);
  return (
    <StyledQuestion>
      {displayIfCorrect(isCorrect)}
      <span className="question-number">{number}</span>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          if (values.answer[0] === correct_answer) {
            incrementScore;
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
              {answers.map((answer) => (
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
