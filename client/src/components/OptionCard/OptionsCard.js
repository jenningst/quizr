import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from './common/base/ButtonBase';

const OptionsCard = props => {
  return (
    <OptionsWrapper className="options-wrapper">
      <OptionItemWrapper className="option-item-wrapper">
        <OptionButton>{"E"}</OptionButton>
        <Label>{"Edit"}</Label>
      </OptionItemWrapper>
      <OptionItemWrapper className="option-item-wrapper">
        <OptionButton>{"D"}</OptionButton>
        <Label>{"Delete"}</Label>
      </OptionItemWrapper>
      <OptionItemWrapper className="option-item-wrapper">
        <OptionButton>{"D"}</OptionButton>
        <Label>{"Duplicate"}</Label>
      </OptionItemWrapper>
    </OptionsWrapper>
  );
};

// OptionsCard.propTypes = {
  
// };

export default OptionsCard;

const OptionsWrapper = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items; center;
  border-radius: 2px;
  border: 1px dashed lightgrey;

  & > div {
    margin-bottom: .50em;
    margin-left: .50em;
    margin-right: .50em;
  }

  & div:first-of-type {
    margin-top: .50em
  }
`;

const OptionItemWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  & :first-child {
    margin-right: .50em;
  }
`;

const Label = styled.span`
  flex-grow: 2;
  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border: none;
`;

const OptionButton = styled(SmallButton)`
  
`;
