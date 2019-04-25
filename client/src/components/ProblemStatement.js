import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProblemStatement = ({ title, updateTitle }) => {  
  return (
    <>
      <Title>What is the question?</Title>
      <InputWrapper>
        <Input
          rows="2"
          cols="20"
          name="question-text"
          placeholder="Start typing the question here ..."
          value={title}
          onChange={handleInputChange}
        />
      </InputWrapper>
    </>
  );

  // Handles changes for input fields
  function handleInputChange(e) {
    updateTitle(e.target.value);
  }
};

ProblemStatement.propTypes = {
  title: PropTypes.string.isRequired,
  updateTitle: PropTypes.func.isRequired,
};

export default ProblemStatement;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border: 1px solid red;
`;

const Input = styled.input`
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  color: #333333;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;

  padding: .5em .5em .5em .5em;

  &::placeholder {
    color: #CCCCCF;
    font-size: 1em;
    font-weight: 400;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;