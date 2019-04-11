import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    {children}
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;