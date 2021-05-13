import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import TextComponent from '../../components/Text';

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

export const Text = styled(TextComponent)`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 35px;
`;
