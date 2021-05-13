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
import TextToSpeechButton from '../../components/TextToSpeechButton';

import logoImg from '../../assets/images/logo.png';
import { useAuth } from '../../hooks/auth';
import { useSettings } from '../../hooks/settings';
import { speech } from '../../utils/voice';

import {
  Container,
  TextToSpeechButtonContainer,
  Button,
  Image,
  BackButton,
  BackButtonText,
} from './styles';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

const SignIn = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const { updateSettings } = useSettings();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    setLoading(true);

    try {
      const user = await signIn({ name: data.name, password: data.password });

      if (user.settings) {
        await updateSettings(user.settings);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao entrar, tente novamente.';

      await speech(errorMessage);

      Alert.alert('Ops...', errorMessage);

      setLoading(false);
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
            <TextToSpeechButtonContainer>
              <TextToSpeechButton text="Digite o nome e a senha da sua conta nos campos abaixo, e toque no botão rosa para entrar. Se quiser voltar, toque no botão no fim da tela." />
            </TextToSpeechButtonContainer>

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
              returnKeyType="send"
              onSubmitEditing={handleSubmit(onSubmit)}
              textContentType="newPassword"
            />

            <Button loading={loading} onPress={handleSubmit(onSubmit)}>
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackButtonText fontWeight="medium">Voltar</BackButtonText>
        </BackButton>
      )}
    </>
  );
};

export default SignIn;
