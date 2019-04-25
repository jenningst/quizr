import styled from 'styled-components';

export const BigButton = styled.button`
  text-transform: uppercase;
  letter-spacing: .10em;
  font-size: .90em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  padding: 1em;
  border-radius: 2px;
`;

export const MediumButton = styled.button`
  text-transform: uppercase;
  letter-spacing: .10em;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  padding: .8em;
  border-radius: 2px;
`;

export const SmallButton = styled.button`
  text-transform: lowercase;
  font-size: .90em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border-radius: 2px;
`;

export default { BigButton, MediumButton, SmallButton };
