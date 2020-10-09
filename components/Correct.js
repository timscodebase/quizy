import styled from "styled-components";

const StyledCorrect = styled.div`
  width: 2em;
  height: 2em;
  position: absolute;
  display: grid;
  place-items: center;
  top: -1.2em;
  right: 0.2em;
  font-size: 1.5em;
  color: var(--bg-color);
  background-color: var(--success-color);
  border-radius: 100%;
`;

export default function Correct() {
  return <StyledCorrect>&#10004;</StyledCorrect>;
}
