import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './common/Form';
import ChoiceItem from './ChoiceItem';
import styled from 'styled-components';
import { SmallButton } from './common/base/ButtonBase';
import Markdown from 'markdown-to-jsx';

const ChoiceEntry = ({
  title,
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
    <>
      <Title>
        <Markdown options={{ forceBlock: true}}>
          {title}
        </Markdown>
      </Title>
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
      <Form onSubmit={addNewChoice}>
        <InputWrapper>
          {allowMarkdown 
            ? <TextArea
                rows="3"
                cols="20"
                name="choice-text"
                value={choiceText}
                onChange={handleInputChange}
                placeholder="Type a valid choice..."
              />
            : <Input 
                name="choice-text"
                value={choiceText}
                onChange={handleInputChange}
                placeholder="Type a valid choice..."
              />
          }
          <EmbeddedButton
            type="submit"
          >
            Add
          </EmbeddedButton>
        </InputWrapper>
      </Form>
      <ChoiceBank className="choice-bank">
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
      </ChoiceBank>
    </>
  );

  // Handles changes for input fields
  function handleInputChange(e) {
    setChoiceText(e.target.value);
  }

  // Handles toggle for button
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

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const ChoiceBank = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;

  border: 1px solid blue;

  & > div {
    margin-top: .25em;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
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

const Input = styled.input`
  width: 100%;
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

const EmbeddedButton = styled(SmallButton)`
  font-size: .8em;
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