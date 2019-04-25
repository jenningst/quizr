import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from './common/base/ButtonBase';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

const ProblemStatement = ({ title, updateTitle }) => {
  // Local state for markdown toggle and for code editor
  const [allowMarkdown, setAllowMarkdown] = useState(false);
  const [code, setCode] = useState("// start typing to code...");

  const cmOptions = {
    lineNumbers: true,
    theme: "darcula",
    mode: "javascript",
  }
  
  return (
    <>
      <Title>What is the question?</Title>
      <FlexButtonGroup>
        <SmallButton
          onClick={toggleMarkdown}
        >
          {allowMarkdown
            ? "Markdown Enabled"
            : "Markdown Disabled"
          }
        </SmallButton>
      </FlexButtonGroup>
      <InputWrapper>
        {allowMarkdown ? (
          <CodeMirror
            value={code}
            onChange={updateCode}
            options={cmOptions}
          />
        ) : (
          <Input
            name="question-text"
            placeholder="Start typing the question here ..."
            value={title}
            onChange={handleInputChange}
          />
        )}
      </InputWrapper>
    </>
  );

  // Handles changes for code editor
  function updateCode(newCode) {
    setCode(newCode);
  }

  // Handles changes for input fields
  function handleInputChange(e) {
    updateTitle(e.target.value);
  }

  // Handles toggle for button
  function toggleMarkdown() {
    setAllowMarkdown(!allowMarkdown);
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
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  max-width: 700px;
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

const TextArea = styled.textarea`
  width: 100%;
  max-width: 700px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  color: #333333;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;

  resize: none;
  padding: .5em .5em .5em .5em;
  word-wrap: soft;

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

const FlexButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;