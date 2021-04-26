import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../components/Button';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 20px 30px;

  align-items: center;
`;

export const Header = styled.View`
  padding: ${Platform.OS === 'ios'
      ? getStatusBarHeight() + 40
      : getStatusBarHeight()}px
    0 35px 0;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarWrapper = styled.View`
  margin-bottom: 35px;

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

export const Level = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Nunito-Bold';
  margin-left: 10px;
`;

export const SignOutButton = styled(ButtonComponent)`
  margin-top: 15px;
  background: #ca0000;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 15px;
`;
