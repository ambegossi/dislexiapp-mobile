import styled from 'styled-components/native';

import TextComponent from '../../components/Text';

export const Background = styled.ImageBackground`
  flex: 1;
  padding: 0 30px 70px 30px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled(TextComponent)`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 35px;
`;
