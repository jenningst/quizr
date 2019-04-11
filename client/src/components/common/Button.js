import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './base/ButtonBase';

const Button = ({ onClick, type, children }) => (
  <ButtonBase
    type={type}
    onClick={onClick}
  >
    {children}
  </ButtonBase>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
};

export default Button;
