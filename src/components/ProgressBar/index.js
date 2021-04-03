import React from 'react';
import PropTypes from 'prop-types';

import { Container, Progress } from './styles';

const ProgressBar = ({ width, progress, total }) => {
  const progressFragmentWidth = width / total;

  const progressWidth = progressFragmentWidth * progress;

  return (
    <Container width={width}>
      <Progress width={progressWidth} />
    </Container>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  width: PropTypes.number,
};

ProgressBar.defaultProps = {
  width: 125,
};

export default ProgressBar;
