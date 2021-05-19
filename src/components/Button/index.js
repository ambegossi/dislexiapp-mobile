import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const Button = ({ children, loading, icon, enabled, ...rest }) => {
  return (
    <Container enabled={!loading && enabled} {...rest}>
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
  enabled: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
  icon: null,
  enabled: true,
};

export default Button;
