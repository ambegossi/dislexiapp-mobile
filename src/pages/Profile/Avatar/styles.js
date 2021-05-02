import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../../components/Button';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 90px 30px;

  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  padding: ${Platform.OS === 'ios'
      ? getStatusBarHeight() + 40
      : getStatusBarHeight()}px
    0 35px 0;
  width: 100%;
  position: absolute;
  top: 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const UserAvatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  border-width: 3px;
  border-color: #be1fd3;
  margin: 0 15px;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 65px;
`;
