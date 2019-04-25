import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BigButton } from './common/base/ButtonBase';
import ProblemType from './ProblemType';
import ProblemStatement from './ProblemStatement';
import ChoiceEntry from './ChoiceEntry';

const QuestionCarousel = () => {
  const [problemType, setProblemType] = useState("");
  const [step, setStep] = useState(1);
  const [maxStepAllowed, setMaxStepAllowed] = useState(1);
  const [title, setTitle] = useState("//code");
  const [choiceCache, setChoiceCache] = useState([]);
  const [choiceIncrementer, setChoiceIncrementer] = useState(0);

  const totalSteps = 3; // TODO: figure out where to put this; DUMMY DATA
  const allowMarkdown = true; // TODO: add config to problem types
  const PROBLEM_TYPES = ["MULT_ANS_SIMPLE", "MULT_ANS_ADV", "LIVE_CODE"];

  // hook for problemType validation
  useEffect(() => {
    // if problemType is selected, allow navigation forward
    if (problemType) 
    {
      setMaxStepAllowed(2);
    };
  }, [problemType]);

  // hook for title validation
  useEffect(() => {
    // if title, allow navigation forward
    if (problemType) {
      if (title) {
        setMaxStepAllowed(3);
      } else {
        console.log('setting back to 2')
        setMaxStepAllowed(2);
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
          setMaxStepAllowed(4);
        } else {
          setMaxStepAllowed(3);
        }
      } else {
        setMaxStepAllowed(3);
      }
    }
  }, [choiceCache]);

  return (
    <ComposeQuestionWrapper className="question-carousel">
      <Counter>STEP {step}</Counter>

        <FloatingSection>
          {renderStep()}
        </FloatingSection>

      <CenteredButtonGroup className="change-step">
        <BigButton
          name="previous"
          disabled={step === 1 ? 'disabled' : null}
          onClick={movePage}
        >
          Previous
        </BigButton>
        <BigButton
          name="next"
          disabled={step === maxStepAllowed ? 'disabled' : null}
          onClick={step === totalSteps ? submitProblem : movePage}
        >
          {step === totalSteps ? 'Submit' : 'Next'}
        </BigButton> 
      </CenteredButtonGroup>

    </ComposeQuestionWrapper>
  );

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <ProblemType
            problemTypes={PROBLEM_TYPES}
            currentType={problemType}
            toggleSelect={toggleSelect}
          />
        );
      case 2:
        return (
          <ProblemStatement
            title={title}  
            updateTitle={updateTitle}
          />
        );
      case 3:
        return (
          <ChoiceEntry
            allowMarkdown={allowMarkdown}
            title={title}
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
      setStep(step - 1);
      return;
    }
    setStep(step + 1);
  }

  // Toggles the problem type selected
  function toggleSelect(e) {
    setProblemType(e.target.name);
  }

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

export default QuestionCarousel;

const ComposeQuestionWrapper = styled.div`
  display: grid;
  grid-template-rows: 5em 1fr 5em;
  grid-template-areas:
    "header"
    "main"
    "footer";
  width: auto;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
`;

const FloatingSection = styled.section`
  grid-area: main;
  padding-left: 1em;
  padding-right: 1em;
`;

const FlexButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const CenteredButtonGroup = styled(FlexButtonGroup)`
  grid-area: footer;
  flex-wrap: nowrap;
  margin-top: 1em;
  margin-bottom: 1em;

  & button {
    width: 15em;

    & + button {
      margin-left: 1em;
    }
  }
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const Counter = styled(Title)`
  font-size: 1em;
  grid-area: header;
`;
