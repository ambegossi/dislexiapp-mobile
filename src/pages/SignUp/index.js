import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../../components/Input';

import logoImg from '../../assets/images/logo.png';

import { Container, Button, Image, BackButton, BackButtonText } from './styles';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 dígitos'),
  passwordConfirmation: yup
    .string()
    .required('A confirmação é obrigatória')
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder'),
});

const SignUp = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onSubmit = data => console.log(data);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container colors={['rgba(33,39,101,1)', 'rgba(49,55,118,1)']}>
            <Image source={logoImg} />

            <Input
              autoCorrect={false}
              name="name"
              icon="user"
              placeholder="Nome"
              control={control}
              errors={errors}
              ref={nameInputRef}
            />

            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              control={control}
              errors={errors}
              ref={passwordInputRef}
              secureTextEntry
            />

            <Input
              name="passwordConfirmation"
              icon="lock"
              placeholder="Confirme a senha"
              control={control}
              errors={errors}
              ref={passwordConfirmationInputRef}
              secureTextEntry
            />

            <Button onPress={handleSubmit(onSubmit)}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
      )}
    </>
  );
};

export default SignUp;
