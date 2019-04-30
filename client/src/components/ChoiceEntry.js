import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './common/Form';
import ChoiceItem from './ChoiceItem';
import styled from 'styled-components';
import { SmallButton } from './common/base/ButtonBase';
import { MediumInput } from './common/base/InputBase';
import CodeEditor from './CodeEditor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

const ChoiceEntry = ({
  problemType,
  title,
  code,
  choiceCache,
  toggleIsAnswer,
  addChoice, 
  updateChoice,
  deleteChoice
}) => {
  // Local state for handling input changes and markdown toggle
  const [choiceText, setChoiceText] = useState("");
  const [allowMarkdown, setAllowMarkdown] = useState(false);

  return (
    <PageWrapper>
      <Title>{title}</Title>

      {problemType.DISPLAY_NAME === "Advanced Multiple Answer" &&
        <CodeEditor
          code={code}
          setCode={() => { return; }}
          options={{ readOnly: true }}
        />
      }
      <FlexButtonGroup>
        <SmallButton
          onClick={toggleMarkdown}
        >
          {allowMarkdown
            ? "Markdown in Answers Enabled"
            : "Markdown in Answers Disabled"
          }
        </SmallButton>
      </FlexButtonGroup>

      <ChoiceComposerWrapper className="choice-composer">
        <ChoiceInput className="choice-input-form">
          <Form onSubmit={addNewChoice}>
            <InputWrapper className="form-input-wrapper">
              {allowMarkdown 
                ? <TextArea
                    rows="3"
                    cols="20"
                    name="choice-text"
                    value={choiceText}
                    onChange={handleInputChange}
                    placeholder="Start typing a choice ..."
                  />
                : <Input 
                    name="choice-text"
                    value={choiceText}
                    onChange={handleInputChange}
                    placeholder="Start typing a choice ..."
                  />
              }
              <EmbeddedButton
                type="submit"
              >
                Add
              </EmbeddedButton>
            </InputWrapper>
          </Form>
        </ChoiceInput>
        <ChoiceList className="choice-list">
          {choiceCache &&
            choiceCache.map(choice => {
              const { index, isAnswer, text } = choice;
              return (
                <ChoiceItem
                  key={index}
                  index={index}
                  allowMarkdown={allowMarkdown}
                  choiceText={text}
                  isAnswer={isAnswer}
                  toggleIsAnswer={toggleIsAnswer}
                  updateChoice={updateChoice}
                  deleteChoice={deleteChoice}
                />
              )
            })
          }
        </ChoiceList>
      </ChoiceComposerWrapper>
    </PageWrapper>
  );

  // Handles changes for input fields
  function handleInputChange(e) {
    setChoiceText(e.target.value);
  }

  // Handles toggle for allowing markdown
  function toggleMarkdown() {
    setAllowMarkdown(!allowMarkdown);
  }

  // Adds a new choice
  function addNewChoice(e) {
    e.preventDefault();
    addChoice(choiceText);
    setChoiceText("");
  }
};

ChoiceEntry.propTypes = {
  problemType: PropTypes.shape({
    DISPLAY_NAME: PropTypes.string.isRequired,
    ALLOW_MARKDOWN: PropTypes.bool.isRequired,
    CODE_EDITOR: PropTypes.bool.isRequired,
  }),
  title: PropTypes.string.isRequired,
  choiceCache: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isAnswer: PropTypes.bool.isRequired,
  }).isRequired,),
  toggleIsAnswer: PropTypes.func.isRequired,
  addChoice: PropTypes.func.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
};

export default ChoiceEntry;

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const ChoiceComposerWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  max-width: 950px;

  & form {
    margin-bottom: 1em;
    flex-grow: 2;
  }
`;

const ChoiceInput = styled.div`
  width: 100%;
`;

const ChoiceList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-height: 50vh;
  overflow: scroll;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  background: #ffffff;
  padding-top: .50em;
  padding-bottom: .50em;

  & :first-child {
    margin-left: 1em;
    margin-right: 1em;
  }

  & :last-child {
    margin-right: 1em;
  }
`;

const TextArea = styled.textarea`
  flex-grow: 2;

  width: 100%;
  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border: none;
  resize: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const Input = styled(MediumInput)`
  width: 100%;
  border: none;
  outline: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const EmbeddedButton = styled(SmallButton)`
  font-size: .70em;
  margin-right: .5em;
  background: #CCCCCF;
  color: #FFFFFF;
  outline: none;
  border: none;

  &:hover {
    background: #8B90FF;
  }
`;

const FlexButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  margin-bottom: 1em;
`;