import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight()}px 0 20px 0;

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const UserName = styled.Text`
  color: #fff;
  font-size: 24px;
  font-family: 'Nunito-SemiBold';
  margin-right: 15px;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;

  border-width: 3px;
  border-color: #be1fd3;
`;

export const NamingButton = styled.TouchableOpacity`
  margin-bottom: 20px;
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

export const NamingTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'Nunito-SemiBold';
`;
