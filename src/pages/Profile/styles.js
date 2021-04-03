import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../components/Button';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight()}px 0 30px 0;
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

export const Button = styled(ButtonComponent)`
  margin-top: 15px;
`;
