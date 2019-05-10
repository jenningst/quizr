import styled from 'styled-components';

export const BigButton = styled.button`
  text-transform: uppercase;
  letter-spacing: .10em;
  font-size: .90em;
  font-family: 'Montserrat', sans-serif;
  padding: 1em;
  border-radius: 2px;
  border: none;
`;

export const MediumButton = styled.button`
  text-transform: uppercase;
  letter-spacing: .10em;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  padding: .8em;
  border-radius: 2px;
  border: none;
`;

export const SmallButton = styled.button`
  text-transform: lowercase;
  font-size: .7em;
  font-family: 'Montserrat', sans-serif;
  padding: .50em
  border-radius: 2px;
  border: none;
`;

export default { BigButton, MediumButton, SmallButton };
