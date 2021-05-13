import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { useSettings } from '../../hooks/settings';

import { Container, TextInput, Icon, ErrorText } from './styles';

const Input = forwardRef(
  ({ name, icon, control, errors, defaultValue, ...rest }, ref) => {
    const { settings } = useSettings();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(value => {
      setIsFocused(false);

      setIsFilled(!!value);
    }, []);

    return (
      <>
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <Container isErrored={!!errors[name]} isFocused={isFocused}>
              {icon && (
                <Icon
                  name={icon}
                  size={20}
                  color={isFocused || isFilled ? '#be1fd3' : '#b6b6b6'}
                />
              )}

              <TextInput
                name={name}
                placeholderTextColor="#b6b6b6"
                onChangeText={text => onChange(text)}
                onFocus={handleInputFocus}
                onBlur={() => handleInputBlur(value)}
                value={value}
                ref={ref}
                fontFamily={
                  !!settings && settings.font_family
                    ? settings.font_family
                    : 'nunito'
                }
                {...rest}
              />
            </Container>
          )}
          name={name}
          defaultValue={defaultValue}
          onFocus={() => {
            ref.current?.focus();
          }}
        />
        {errors[name] && (
          <ErrorText fontWeight="medium">{errors[name].message}</ErrorText>
        )}
      </>
    );
  },
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.string,
};

Input.defaultProps = {
  icon: null,
  defaultValue: '',
};

export default Input;
