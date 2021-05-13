import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../components/Button';
import Text from '../../components/Text';

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

export const Title = styled(Text)`
  color: #fff;
  font-size: 20px;
  margin-bottom: 5px;
`;

export const FontContainer = styled.View`
  width: 100%;
  margin-bottom: 30px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FontExampleText = styled.Text`
  color: #fff;
  font-size: 28px;
  font-family: ${props => `${props.font}-Regular`};
  margin: 0 15px;
`;

export const SpeakingRateContainer = styled.View`
  width: 100%;
  margin-bottom: 30px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SpeakingRateText = styled(Text)`
  color: #fff;
  font-size: 28px;
  margin: 0 15px;
`;

export const ProfilePrivacyContainer = styled.View`
  width: 100%;
  margin-bottom: 30px;

  align-items: center;
`;

export const ProfilePrivacyButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: ${props => (props.selected ? '#23c7bf' : 'transparent')};
  width: 260px;
  border-radius: 15px;
  margin-bottom: 7px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ProfilePrivacyButtonText = styled(Text)`
  color: #fff;
  font-size: 18px;
  margin-left: 15px;
`;

export const DeleteAccountButton = styled(ButtonComponent)`
  margin-top: 5px;
  background: #ca0000;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 15px;
`;
