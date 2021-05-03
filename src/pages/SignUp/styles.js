import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../components/Button';

export const Container = styled(LinearGradient)`
  padding: 0 30px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextToSpeechButtonContainer = styled.View`
  height: 28px;
  width: 100%;

  align-items: flex-start;
`;

export const Image = styled.Image`
  margin-bottom: 50px;
  width: 160px;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 15px;
  margin-bottom: 40px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #adadad;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Nunito-SemiBold';
  margin-left: 15px;
`;
