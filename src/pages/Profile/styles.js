import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../components/Button';
import Text from '../../components/Text';

export const Background = styled.ImageBackground`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding: 0 30px 70px 30px;

  align-items: center;
`;

export const Header = styled.View`
  padding: ${Platform.OS === 'ios'
      ? getStatusBarHeight() + 40
      : getStatusBarHeight()}px
    0 20px 0;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarWrapper = styled.View`
  margin-bottom: 30px;

  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

export const UserAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 3px;
  border-color: #be1fd3;
  margin-right: 20px;
`;

export const Level = styled(Text)`
  color: #fff;
  font-size: 18px;
  margin-left: 10px;
`;

export const SignOutButton = styled(ButtonComponent)`
  margin-top: 15px;
  background: #ca0000;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 10px;
`;
