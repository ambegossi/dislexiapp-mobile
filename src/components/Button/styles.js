import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #be1fd3;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Nunito-SemiBold';
  color: #fff;
  font-size: 18px;
`;
