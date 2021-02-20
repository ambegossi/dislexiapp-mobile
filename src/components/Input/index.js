import React from 'react';
import PropTypes from 'prop-types';

import { Container, TextInput, Icon } from './styles';

const Input = ({ name, icon, ...rest }) => {
  return (
    <Container>
      {icon && <Icon name={icon} size={20} color="#B6B6B6" />}

      <TextInput name={name} placeholderTextColor="#B6B6B6" {...rest} />
    </Container>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Input.defaultProps = {
  icon: null,
};

export default Input;
