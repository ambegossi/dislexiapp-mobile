import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px;

  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  padding-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + 40
    : getStatusBarHeight()}px;
  width: 100%;
  position: absolute;
  top: 0;

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
