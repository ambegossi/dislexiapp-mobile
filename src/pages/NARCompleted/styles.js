import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 90px 30px;

  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  padding-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + 40
    : getStatusBarHeight()}px;
  width: 100%;
  position: absolute;
  top: 0;

  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 36px;
  font-family: 'Nunito-Bold';
  margin-top: 20px;
  margin-bottom: 30px;
`;
