import styled from 'styled-components';

export const BigInput = styled.input`
  font-size: 1em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  padding: 1em;
  border-radius: 2px;
`;

export const MediumInput = styled.input`
  font-size: .90em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .8em;
  border-radius: 2px;
`;

export const SmallInput = styled.input`
  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border-radius: 2px;
`;

export default { BigInput, MediumInput, SmallInput };