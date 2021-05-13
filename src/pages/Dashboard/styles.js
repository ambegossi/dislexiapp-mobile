import styled from 'styled-components/native';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Text from '../../components/Text';

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

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserName = styled(Text)`
  color: #fff;
  font-size: 24px;
  margin-right: 15px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 3px;
  border-color: #be1fd3;
`;

export const NamingButton = styled.TouchableOpacity`
  margin-bottom: 35px;
`;

export const NamingImageWrapper = styled(LinearGradient)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top: 10px;
  height: 130px;

  justify-content: flex-end;
  align-items: center;
`;

export const NamingImage = styled.Image`
  height: 125px;
  width: 170px;
`;

export const NamingBottomContainer = styled.View`
  padding: 7px 0;
  background-color: #2e3474;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  justify-content: center;
  align-items: center;
`;

export const NamingTitle = styled(Text)`
  color: #fff;
  font-size: 20px;
`;
