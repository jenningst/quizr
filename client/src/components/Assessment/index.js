import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BigButton } from '../common/Button';

const Assessment = ({ score, total, reportType, data, resetQuiz }) => {

  console.log(JSON.stringify(data));

  return (
    <AssessmentWrapper>
      <h1>Congratulations on Finishing!</h1>
      <p>You scored {score} out of {total}</p>
      <div>
        <ul>
          {data.map(item => <li key={item.id}>{item.answers} {item.choices}</li>)}
        </ul>
      </div>
      <BigButton onClick={resetQuiz}>START OVER</BigButton>
    </AssessmentWrapper>
  );
};

Assessment.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  reportType: PropTypes.string.isRequired,
  data: PropTypes.array,
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