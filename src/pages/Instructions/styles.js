import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import ButtonComponent from '../../components/Button';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CardContainer = styled.View`
  width: ${width}px;
  margin-bottom: 10px;

  justify-content: flex-end;
  align-items: center;
`;

export const Card = styled.View`
  border-radius: 30px;
  background-color: #fff;
  height: 220px;
  width: 260px;

  justify-content: center;
  align-items: center;
`;

export const PaginationContainer = styled.View`
  width: 100%;
  padding: 0 80px;

  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationDotsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const PaginationDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #20beb7;
  margin: 0 4px;
  opacity: ${props => props.opacity};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding: 0 30px;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 20px;
  margin-bottom: 90px;
`;
