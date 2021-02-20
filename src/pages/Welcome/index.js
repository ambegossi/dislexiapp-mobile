import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/images/logo.png';
import astronaut from '../../assets/animations/astronaut.json';

import {
  Container,
  Image,
  Button,
  SignInButton,
  SignInButtonText,
} from './styles';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <>
      <Container colors={['rgba(33,39,101,1)', 'rgba(49,55,118,1)']}>
        <LottieView source={astronaut} autoPlay loop style={{ width: 250 }} />

        <Image source={logoImg} />

        <Button onPress={() => navigation.navigate('SignUp')}>Cadastrar</Button>
      </Container>
      <SignInButton onPress={() => navigation.navigate('SignIn')}>
        <SignInButtonText>Entrar</SignInButtonText>
      </SignInButton>
    </>
  );
};

export default Welcome;
