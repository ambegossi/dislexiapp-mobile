import styled, { css } from 'styled-components/native';

export const TextComponent = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Nunito-Regular';

  ${props =>
    props.fontFamily === 'nunito' &&
    props.fontWeight === 'regular' &&
    css`
      font-family: 'Nunito-Regular';
    `}

  ${props =>
    props.fontFamily === 'roboto' &&
    props.fontWeight === 'regular' &&
    css`
      font-family: 'Roboto-Regular';
    `}

    ${props =>
    props.fontFamily === 'ubuntu' &&
    props.fontWeight === 'regular' &&
    css`
      font-family: 'Ubuntu-Regular';
    `}

    ${props =>
    props.fontFamily === 'nunito' &&
    props.fontWeight === 'medium' &&
    css`
      font-family: 'Nunito-SemiBold';
    `}

  ${props =>
    props.fontFamily === 'roboto' &&
    props.fontWeight === 'medium' &&
    css`
      font-family: 'Roboto-Medium';
    `}

  ${props =>
    props.fontFamily === 'ubuntu' &&
    props.fontWeight === 'medium' &&
    css`
      font-family: 'Ubuntu-Medium';
    `}

    ${props =>
    props.fontFamily === 'nunito' &&
    props.fontWeight === 'bold' &&
    css`
      font-family: 'Nunito-Bold';
    `}

  ${props =>
    props.fontFamily === 'roboto' &&
    props.fontWeight === 'bold' &&
    css`
      font-family: 'Roboto-Bold';
    `}

  ${props =>
    props.fontFamily === 'ubuntu' &&
    props.fontWeight === 'bold' &&
    css`
      font-family: 'Ubuntu-Bold';
    `}
`;
