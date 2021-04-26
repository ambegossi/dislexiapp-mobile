import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { darken } from 'polished';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #be1fd3;
  border-radius: 10px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${props =>
    props.loading &&
    css`
      background: ${darken(0.1, '#be1fd3')};
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Nunito-SemiBold';
  color: #fff;
  font-size: 18px;
`;
