import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../../components/Input';
import TextToSpeechButton from '../../components/TextToSpeechButton';
import ProgressBar from '../../components/ProgressBar';

import { useAuth } from '../../hooks/auth';
import { useSettings } from '../../hooks/settings';
import api from '../../services/api';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { speech } from '../../utils/voice';

import bgImg from '../../assets/images/bg.png';
import avatarDefaultImg from '../../assets/images/avatarDefault.png';

import {
  Container,
  Header,
  AvatarWrapper,
  UserAvatar,
  Level,
  SignOutButton,
  Button,
} from './styles';

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

const Profile = () => {
  const navigation = useNavigation();

  const { user, updateUser, signOut } = useAuth();
  const { settings, removeSettings } = useSettings();

  const [loading, setLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: capitalizeFirstLetter(user.name),
    },
  });

  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await api.put('/users', data);

      await updateUser(response.data);

      const successMessage = 'Perfil atualizado com sucesso!';

      await speech(successMessage, settings.speaking_rate);

      Alert.alert(successMessage);

      navigation.navigate('Dashboard');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao atualizar o perfil, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
    setLoading(false);
  };

  const handleNavigateToAvatar = () => {
    navigation.navigate('Avatar', {
      avatarId: user.profile.avatar ? user.profile.avatar.id : null,
    });
  };

  const handleSignOut = async () => {
    setSignOutLoading(true);

    await removeSettings();

    await signOut();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <Container source={bgImg}>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left-circle" size={32} color="#fff" />
            </TouchableOpacity>

            <TextToSpeechButton text="Toque no avatar para alterá-lo. Digite um nome e uma senha nos campos abaixo, e toque no botão rosa se quiser salvar." />
          </Header>

          <AvatarWrapper>
            <TouchableOpacity onPress={handleNavigateToAvatar}>
              <UserAvatar
                source={
                  user.profile.avatar
                    ? {
                        uri: user.profile.avatar.image_url,
                      }
                    : avatarDefaultImg
                }
              />
            </TouchableOpacity>

            <ProgressBar progress={user.profile.score % 30} total={30} />

            <Level fontWeight="bold">{user.profile.level.toString()}</Level>
          </AvatarWrapper>

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

          <SignOutButton loading={signOutLoading} onPress={handleSignOut}>
            Sair
          </SignOutButton>

          <Button loading={loading} onPress={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
