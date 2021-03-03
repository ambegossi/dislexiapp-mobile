import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../../components/Input';

import logoImg from '../../assets/images/logo.png';
import api from '../../services/api';

import { Container, Button, Image, BackButton, BackButtonText } from './styles';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 dígitos'),
  password_confirmation: yup
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

  const onSubmit = async data => {
    try {
      await api.post('/users', data);

      Alert.alert('Cadastro realizado com sucesso!', 'Você já pode entrar.');

      navigation.navigate('SignIn');
    } catch (err) {
      Alert.alert(
        'Erro no cadastro',
        err.response?.data?.message ||
          'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      );
    }
  };

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
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              control={control}
              errors={errors}
              ref={nameInputRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              control={control}
              errors={errors}
              ref={passwordInputRef}
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current?.focus();
              }}
              textContentType="newPassword"
            />

            <Input
              name="password_confirmation"
              icon="lock"
              placeholder="Confirme a senha"
              control={control}
              errors={errors}
              ref={passwordConfirmationInputRef}
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={handleSubmit(onSubmit)}
              textContentType="newPassword"
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
