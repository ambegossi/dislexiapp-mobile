import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Text from '../../components/Text';

export const Background = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 70px 30px;

  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  padding: ${Platform.OS === 'ios'
      ? getStatusBarHeight() + 40
      : getStatusBarHeight()}px
    0 25px 0;
  width: 100%;
  position: absolute;
  top: 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FirstUserContainer = styled.View`
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  padding-bottom: 25px;
  width: 100%;
  margin-bottom: 15px;

  align-items: center;
  justify-content: center;
`;

export const FirstUserAvatarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FirstUserNameContainer = styled.View`
  margin-top: 20px;

  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 3px;
  border-color: #be1fd3;
  margin: 0 15px;
`;

export const FirstUserName = styled(Text)`
  color: #fff;
  font-size: 24px;
  margin-right: 15px;
`;

export const RankingList = styled.FlatList`
  margin-top: 70px;
  width: 100%;
`;

export const RankingRowContainer = styled.View`
  padding: 10px 0;

  flex-direction: row;
  justify-content: space-between;
`;

export const RankingUserPositionContainer = styled.View`
  flex-direction: row;
`;

export const RankingUserPosition = styled(Text)`
  color: #fff;
  font-size: 18px;
  margin-right: 7px;
`;

export const RankingUserName = styled(Text)`
  color: #fff;
  font-size: 18px;
`;

export const ShieldImage = styled.ImageBackground`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`;

export const ShieldLevelContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  justify-content: center;
  align-items: center;
`;

export const ShieldLevel = styled(Text)`
  color: #fff;
  font-size: 18px;
`;
