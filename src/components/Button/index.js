import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const Button = ({ children, loading, icon, ...rest }) => {
  return (
    <Container enabled={!loading} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          <ButtonText fontWeight="medium">{children}</ButtonText>

          {!!icon && icon}
        </>
      )}
    </Container>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.node,
};

Button.defaultProps = {
  loading: false,
  icon: null,
};

export default Button;
