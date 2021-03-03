import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const Button = ({ children, loading, ...rest }) => {
  return (
    <Container enabled={!loading} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

export default Button;
