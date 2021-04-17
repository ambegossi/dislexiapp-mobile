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
