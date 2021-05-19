import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Text from '../../components/Text';

export const Background = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 0 30px;

  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  padding: ${Platform.OS === 'ios'
      ? getStatusBarHeight() + 40
      : getStatusBarHeight()}px
    0 30px 0;
  width: 100%;
  position: absolute;
  top: 0;

  align-items: center;
`;

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ResultImage = styled.Image`
  align-self: flex-start;
`;

export const StimulusImage = styled.Image`
  height: 120px;
  width: 120px;
`;

export const WordContainer = styled.View`
  width: 100%;
  height: 65px;
  border-radius: 15px;
  border-color: #fff;
  border-style: solid;
  border-width: 1px;
  margin-top: 15px;
  margin-bottom: 25px;

  justify-content: center;
  align-items: center;
`;

export const Word = styled(Text)`
  color: #fff;
  font-size: 30px;
  text-transform: capitalize;
`;

export const SoundButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: #fff;
  margin-bottom: 25px;

  justify-content: center;
  align-items: center;
`;
