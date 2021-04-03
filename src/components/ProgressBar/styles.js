import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${props => `${props.width}px`};
  height: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Progress = styled.View`
  width: ${props => `${props.width}px`};
  height: 20px;
  border-radius: 10px;
  background-color: #04d361;
`;
