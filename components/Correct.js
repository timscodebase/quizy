import styled from "styled-components";

const StyledCorrect = styled.div`
  width: 2.5em;
  height: 2.5em;
  position: absolute;
  display: grid;
  justify-content: center;
  align-items: center;
  top: 0.5em;
  right: 0.5em;
  font-size: 1.5em;
  color: var(--bg-color);
  background-color: var(--success-color);
  border-radius: 100%;
`;

export default function Correct() {
  return <StyledCorrect>&#10004;</StyledCorrect>;
}
