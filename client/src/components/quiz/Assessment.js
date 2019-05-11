import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton } from '../common/Button';

const Assessment = ({ score, totalPossible, reportType, data, resetQuiz }) => {

  return (
    <AssessmentWrapper>
      <h1>Congratulations on Finishing!</h1>
      <p>You scored {score} out of {totalPossible}</p>
      <BigButton onClick={resetQuiz}>START OVER</BigButton>
    </AssessmentWrapper>
  );
};

Assessment.propTypes = {
  score: PropTypes.number.isRequired,
  totalPossible: PropTypes.number.isRequired,
  reportType: PropTypes.string.isRequired,
  data: PropTypes.object,
};

Assessment.defaultProps = {
  data: null,
};

export default Assessment;

const AssessmentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  
  height: 100%;
`;