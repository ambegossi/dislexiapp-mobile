import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import ButtonComponent from '../../components/Button';

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Image = styled.Image`
  width: 160px;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 60px;
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
