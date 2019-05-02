import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const shortid = require('shortid');

const Icon = ({ imageData, }) => {
  return (
    <StyledIcon
      viewBox={imageData.viewBox}
      className={`${imageData.title}-icon`}
    >
      {renderPath()}
    </StyledIcon>
  );

  // Renders path elements for an svg
  function renderPath() {
    return (
      imageData.paths.map(path => (
        <path
          key={shortid.generate()}
          d={path}
        />
      ))
    );
  }
};

Icon.propTypes = {
  imageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    viewBox: PropTypes.string,
    paths: PropTypes.array.isRequired,
  }).isRequired,
};

export default Icon;

const StyledIcon = styled.svg`
  transition: fill 0.25s;
  width: 2em;
  height: 2em;
`;