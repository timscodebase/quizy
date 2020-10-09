import styled from "styled-components";

const StyledIncorrect = styled.div`
  width: 2em;
  height: 2em;
  position: absolute;
  display: grid;
  place-items: center;
  top: -1.2em;
  right: 0.2em;
  font-size: 1.5em;
  color: var(--bg-color);
  background-color: var(--accent-color);
  border-radius: 100%;
  transform: rotate(45deg);
`;

export default function Incorrect() {
  return <StyledIncorrect>+</StyledIncorrect>;
}
