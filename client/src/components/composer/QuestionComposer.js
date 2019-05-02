import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton } from '../common/Button';
import ProblemType from './ProblemType';
import ProblemStatement from './ProblemStatement';
import ChoiceEntry from './ChoiceEntry';

const QuestionComposer = ({ 
  modes,
  currentStep,
  maxStepAllowed,
  setCurrentStep,
  setMaxStep,
  problemType,
  setProblemType
}) => {
  const [title, setTitle] = useState("");
  const [choiceCache, setChoiceCache] = useState([]);
  const [choiceIncrementer, setChoiceIncrementer] = useState(0);
  const [code, setCode] = useState("// Start typing to add code...");

  const totalSteps = 3; // TODO: figure out where to put this; DUMMY DATA

  // hook for problemType validation
  useEffect(() => {
    // if problemType is selected, allow navigation forward
    if (problemType) 
    {
      setMaxStep(2);
    };
  }, [problemType]);

  // hook for title validation
  useEffect(() => {
    // if title, allow navigation forward
    if (problemType) {
      if (title) {
        setMaxStep(3);
      } else {
        setMaxStep(2);
      }
    }
  }, [title]);

  // hook for choice validation
  useEffect(() => {
    // if number of choices is at least 4...
    if (problemType && title) {
      if (choiceCache.length >= 4) {
        // if one of the choices is an answer, allow navigation forward
        if (choiceCache.filter(c => c.isAnswer === true).length > 0) {
          setMaxStep(4);
        } else {
          setMaxStep(3);
        }
      } else {
        setMaxStep(3);
      }
    }
  }, [choiceCache]);

  return (
    <ComposeQuestionWrapper className="composer-carousel">
      <Header>
        <Counter className="composer-counter">STEP {currentStep}</Counter>
      </Header>

        <MainSection>
          {renderStep()}
        </MainSection>

      <NavigationFooter className="composer-navigation">
        <BigButton
          name="previous"
          disabled={currentStep === 1 ? 'disabled' : null}
          onClick={movePage}
        >
          Previous
        </BigButton>
        <BigButton
          name="next"
          disabled={currentStep === maxStepAllowed ? 'disabled' : null}
          onClick={currentStep === totalSteps ? submitProblem : movePage}
        >
          {currentStep === totalSteps ? 'Submit' : 'Next'}
        </BigButton> 
      </NavigationFooter>

    </ComposeQuestionWrapper>
  );

  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <ProblemType
            modes={modes}
            problemType={problemType}
            setProblemType={setProblemType}
          />
        );
      case 2:
        return (
          <ProblemStatement
            problemType={problemType}
            title={title}  
            updateTitle={updateTitle}
            code={code}
            updateCode={updateCode}
          />
        );
      case 3:
        return (
          <ChoiceEntry
            problemType={problemType}
            title={title}
            code={code}
            choiceCache={choiceCache}
            toggleIsAnswer={toggleIsAnswer}
            addChoice={addChoice}
            updateChoice={updateChoice}
            deleteChoice={deleteChoice}
          />
        );
      default:
       return null;
    }
  }

  // Sets the step state
  function movePage(e) {
    if (e.target.name === "previous") {
      setCurrentStep(currentStep - 1);
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  // // Toggles the problem type selected
  // function toggleSelect(index) {
  //   setProblemType(modes[index]);
  // }

  // Sets the problem title
  function updateTitle(payload) {
    setTitle(payload);
  }

  // Toggles whether a choice is a valid answer
  function toggleIsAnswer(index) {
    let updatedCache = [ ...choiceCache ];
    // find object with the correct index
    const result = updatedCache.findIndex(choice => choice.index === index);
    if (result !== -1) {
      // toggle isAnswer property
      updatedCache[result].isAnswer = !updatedCache[result].isAnswer;
      setChoiceCache(updatedCache);
    }
  }

  // Handles code editor changes
  function updateCode(newCode) {
    setCode(newCode);
  }

  // Creates a new, blank choice template in state
  function addChoice(payload) {
    // setup choice payload
    const newChoice = { 
      index: choiceIncrementer,
      text: payload,
      isAnswer: false,
    };
    setChoiceCache([...choiceCache, newChoice ]);
    setChoiceIncrementer(choiceIncrementer + 1);
  }

  // Deletes an existing choice from state
  function deleteChoice(index) {
    let updatedCache = [ ...choiceCache ];
    // find object with the correct index
    const result = updatedCache.findIndex(choice => choice.index === index);
    if (result !== -1) {
      let choices;
      if (result === 0) { // result was first element
        choices = updatedCache.slice(1);
      } else if (result === updatedCache.length - 1) { // result is last element
        choices = updatedCache.slice(0, -1);
      } else { // result was element other than first or last
        choices = [
          ...updatedCache.slice(0, result),
          ...updatedCache.slice(result + 1)];
      }
      setChoiceCache(choices);
    }
  }

  // Updates an existing choice from state
  function updateChoice(choicePayload) {
    if (choicePayload && choicePayload.index > -1) {
      let updatedCache = [ ...choiceCache ];
      const result = updatedCache.findIndex(c => c.index === choicePayload.index);
      if (result !== -1) {
        // update state properties for the input in state
        updatedCache[result].text = choicePayload.text;
        updatedCache[result].isAnswer = choicePayload.isAnswer;
        // update state
        setChoiceCache(updatedCache);
      }
    }
  }

  // Saves the problem
  function submitProblem(e) {
    e.preventDefault();
    // TODO: Submit the problem
    alert('You submitted!');
  }
};

QuestionComposer.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.shape({
    DISPLAY_NAME: PropTypes.string.isRequired,
    ALLOW_MARKDOWN: PropTypes.bool.isRequired,
    CODE_EDITOR: PropTypes.bool.isRequired,
  })).isRequired,
  currentStep: PropTypes.number.isRequired,
  maxStepAllowed: PropTypes.number.isRequired,
  setMaxStep: PropTypes.func.isRequired,
}

export default QuestionComposer;

const ComposeQuestionWrapper = styled.div`
  display: grid;
  grid-template-rows: 2em 1fr 5em;
  grid-template-areas:
    "header"
    "main"
    "footer";
  width: auto;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  background: #f5f6fa;
`;

const Header = styled.header`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Counter = styled.h1`
  grid-area: header;

  font-size: 1em;
  text-align: center;
`;

const MainSection = styled.section`
  grid-area: main;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const NavigationFooter = styled.section`
  grid-area: footer;
  
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  margin-top: 1em;
  margin-bottom: 1em;
  background: #f5f6fa;

  & button {
    width: 10em;

    & + button {
      margin-left: 1em;
    }
  }
`;


