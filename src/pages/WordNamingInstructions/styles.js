import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px;

  align-items: center;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight()}px 0 30px 0;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Nunito-SemiBold';
  text-align: center;
  margin-top: 20px;
  margin-bottom: 35px;
`;
