import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Button from './common/Button';
import ButtonBase from './common/base/ButtonBase';

const AnswerItem = ({ index, choiceText, isSelected, toggleIsChoice }) => {  
  
  return (
    <AnswerWrapper key={index}>
      {isSelected ? (
        <LargeButton
          primary
          onClick={e => toggleIsChoice(index)}
        >
          {choiceText}
        </LargeButton>
        ) : (
          <LargeButton
            type="button"
            onClick={e => toggleIsChoice(index)}
          >
            {choiceText}
          </LargeButton>
        )
      }
    </AnswerWrapper>
  );  
};

const AnswerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LargeButton = styled(ButtonBase)`
  width: 100%;
  height: 4em;
  margin: .25em;
  background: ${props => props.primary ? "#f7f8fb" : "#ffffff"};
  border: grey;
  color: ${props => props.primary ? "#9933ff" : "#312c44"};
  font-size: 1em;
  font-weight: ${props => props.primary ? "700" : "400"};
`;

const CircleDiv = styled.div`
  border-radius: 50%;
  border: ${props => props.primary ? "2px solid #312c44" : "2px solide #9933ff"};
`;

AnswerItem.propTypes = {
  index: PropTypes.number.isRequired,
  choiceText: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleIsChoice: PropTypes.func.isRequired,
};

export default AnswerItem;