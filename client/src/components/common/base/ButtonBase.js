import styled from 'styled-components';

const Button = styled.button`
  color: ${props => props.primary ? "#ffffff" : "#5e23be"};
  background: ${props => props.primary ? "#5e23be" : "#ffffff"};
  border: 2px solid #5e23be;
  font-size: .75em;
  font-family: Roboto;
  padding: 0.5em 1em;
  border-radius: 3px;
`;

export default Button;
