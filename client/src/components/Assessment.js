import React from 'react';
import styled from 'styled-components';

const Assessment = ({ results, track, score, totalPossible }) => {

  return (
    <AssessmentWrapper>
      <h1>Congratulations on Finishing!</h1>
      <p>You scored {score} out of {totalPossible}</p>
    </AssessmentWrapper>
  );
};

const AssessmentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #34495E;
`;

export default Assessment;