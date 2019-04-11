import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Button = ({ onClick, type, children }) => (
  <StyledButton
    type={type}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
}

const StyledButton = styled.button`
  color: palevioletred;
  font-size: 1em;
  font-family: Roboto;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

