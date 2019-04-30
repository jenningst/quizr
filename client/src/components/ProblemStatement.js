import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from './common/base/ButtonBase';
import { MediumInput } from './common/base/InputBase';
import CodeEditor from './CodeEditor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

const ProblemStatement = ({ problemType, title, updateTitle, code, updateCode }) => {
  // Local state for markdown toggle and for code editor
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <PageWrapper>
      <Title>What is the question?</Title>

      {problemType.DISPLAY_NAME === "Advanced Multiple Answer" &&
        <FlexButtonGroup>
          <SmallButton
            onClick={toggleShowEditor}
          >
            {showEditor
              ? "Hide Code"
              : "Show Code"
            }
          </SmallButton>
        </FlexButtonGroup>
      }

      <InputWrapper>
        <TextArea
          rows="3"
          cols="15"
          name="question-text"
          placeholder="Start typing your question ..."
          value={title}
          onChange={handleInputChange}
        />
      </InputWrapper>
      {showEditor ?
        <CodeEditor
          code={code}
          setCode={handleCodeChange}
        />
        : null
      }

    </PageWrapper>
  );

  // Handles changes for code editor
  function handleCodeChange(newCode) {
    updateCode(newCode);
  }

  // Handles changes for input fields
  function handleInputChange(e) {
    updateTitle(e.target.value);
  }

  // Handles toggle for button
  function toggleShowEditor() {
    setShowEditor(!showEditor);
  }
};

ProblemStatement.propTypes = {
  problemType: PropTypes.shape({
    DISPLAY_NAME: PropTypes.string.isRequired,
    ALLOW_MARKDOWN: PropTypes.bool.isRequired,
    CODE_EDITOR: PropTypes.bool.isRequired,
  }),
  title: PropTypes.string.isRequired,
  updateTitle: PropTypes.func.isRequired,
};

export default ProblemStatement;

const PageWrapper = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
`;


const InputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 950px;
`;

const TextArea = styled.textarea`
  width: 100%;
  flex-grow: 2;
  font-size: .90em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border: none;
  outline: none;
  resize: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const FlexButtonGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;
