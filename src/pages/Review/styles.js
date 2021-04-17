import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 90px 30px;

  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight()}px 0 30px 0;
  width: 100%;

  align-items: center;
`;

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ResultIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => (props.isCorrect ? '#04d361' : '#ca0000')};

  align-self: flex-start;
  justify-content: center;
  align-items: center;
`;

export const StimulusImage = styled.Image`
  height: 160px;
  width: 160px;
`;

export const WordContainer = styled.View`
  width: 100%;
  height: 80px;
  border-radius: 15px;
  border-color: #fff;
  border-style: solid;
  border-width: 1px;
  margin-top: 20px;
  margin-bottom: 40px;

  justify-content: center;
  align-items: center;
`;

export const Word = styled.Text`
  color: #fff;
  font-size: 36px;
  font-family: 'Nunito-Bold';
`;
