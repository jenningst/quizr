import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const InputField = ({ 
    size,
    type,
    name,
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    children,
  }) => (
  <label>
    {children}
    <StyledInput
      size={size}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </label>
);

export default InputField;

InputField.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

InputField.defaultProps = {
  size: 20,
  name: "",
  onFocus: null,
  onBlur: null,
};

const StyledInput = styled.input`
  font-family: Roboto;
  font-size: 1em;
`;
