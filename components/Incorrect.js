import styled from "styled-components";

const StyledIncorrect = styled.div`
  width: 2em;
  height: 2em;
  padding: 0.5em;
  position: absolute;
  display: grid;
  justify-content: center;
  align-items: center;
  top: 0.5em;
  right: 0.5em;
  font-size: 1.5em;
  color: var(--bg-color);
  background-color: var(--accent-color);
  border-radius: 100%;
  transform: rotate(45deg);
`;

export default function Incorrect() {
  return <StyledIncorrect>+</StyledIncorrect>;
}
