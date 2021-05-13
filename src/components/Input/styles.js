import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Text from '../Text';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #161a43;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: #161a43;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #be1fd3;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'Nunito-SemiBold';

  ${props =>
    props.fontFamily === 'nunito' &&
    css`
      font-family: 'Nunito-SemiBold';
    `}

  ${props =>
    props.fontFamily === 'roboto' &&
    css`
      font-family: 'Roboto-Medium';
    `}


  ${props =>
    props.fontFamily === 'ubuntu' &&
    css`
      font-family: 'Ubuntu-Medium';
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 15px;
`;

export const ErrorText = styled(Text)`
  color: #c53030;
  font-size: 14px;
  margin-bottom: 8px;

  align-self: flex-start;
`;
