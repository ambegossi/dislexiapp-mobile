import React from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const Button = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
