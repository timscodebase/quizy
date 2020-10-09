import styled from "styled-components";

export const FinalScore = styled.p`
  margin: -5px 0;
  color: ${(props) =>
    props.score < 60
      ? "var(--accent-color)"
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
        ? "var(--accent-color)"
        : props.score < 80
        ? "var(--warning-color)"
        : "var(--success-color)"};
  }
`;

export const Title = styled.header`
  width: 100%;
  display: flex;
  margin-bottom: 2em;
  border-radius: 4px;
  border: 1px solid var(--border);

  .info {
    padding: 1em 0;
    margin: 0 auto;
    text-align: center;
    flex-basis: 2;

    h2 {
      font-size: 2.5em;
      color: var(--tx-color);-webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
    -webkit-text-fill-color: ${(props) =>
      props.difficulty == "hard"
        ? "var(--accent-color)"
        : props.difficulty == "medium"
        ? "var(--warning-color)"
        : "var(--success-color)"};
  }
    }

    h2,
    h3 {
      margin-bottom: 0.75em;
    }
  }

  .difficulty {
    display: grid;
    place-items: center;
    padding: 1em;
    background-color: ${(props) =>
      props.difficulty == "hard"
        ? "var(--accent-color-faded)"
        : props.difficulty == "medium"
        ? "var(--warning-color-faded)"
        : "var(--success-color-faded)"};
  }
`;
