import React from 'react';
import PropTypes from 'prop-types';

import { useSettings } from '../../hooks/settings';

import { TextComponent } from './styles';

const Text = ({ children, fontWeight, ...rest }) => {
  const { settings } = useSettings();

  return (
    <TextComponent
      fontFamily={
        !!settings && settings.font_family ? settings.font_family : 'nunito'
      }
      fontWeight={fontWeight}
      {...rest}
    >
      {children}
    </TextComponent>
  );
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold']),
};

Text.defaultProps = {
  fontWeight: 'regular',
};

export default Text;
