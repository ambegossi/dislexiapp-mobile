import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import TextToSpeechButton from '../../components/TextToSpeechButton';

import api from '../../services/api';
import { speech } from '../../utils/voice';
import { useSettings } from '../../hooks/settings';
import { useAuth } from '../../hooks/auth';

import bgImg from '../../assets/images/bg.png';
import orangeAstronautImg from '../../assets/images/orangeAstronaut.png';
import darkAstronautImg from '../../assets/images/darkAstronaut.png';

import {
  Container,
  Header,
  Title,
  FontContainer,
  FontExampleText,
  SpeakingRateContainer,
  SpeakingRateText,
  ProfilePrivacyContainer,
  ProfilePrivacyButton,
  ProfilePrivacyButtonText,
  DeleteAccountButton,
  Button,
} from './styles';

const Settings = () => {
  const navigation = useNavigation();

  const { settings, updateSettings, removeSettings } = useSettings();
  const { signOut } = useAuth();

  const fonts = ['Nunito', 'Roboto', 'Ubuntu'];
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const speakingRates = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5];
  const [currentSpeakingRateIndex, setCurrentSpeakingRateIndex] = useState(0);
  const [profilePrivacy, setProfilePrivacy] = useState('private');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);

  useEffect(() => {
    const fontIndex = fonts.findIndex(
      font => font.toLowerCase() === settings.font_family,
    );

    if (fontIndex) {
      setCurrentFontIndex(fontIndex);
    }

    const speakingRateIndex = speakingRates.findIndex(
      speakingRate => speakingRate === settings.speaking_rate,
    );

    if (speakingRateIndex) {
      setCurrentSpeakingRateIndex(speakingRateIndex);
    }

    const privacy = settings.private_profile ? 'private' : 'public';

    setProfilePrivacy(privacy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const { data } = await api.put('/settings', {
        font_family: fonts[currentFontIndex].toLowerCase(),
        speaking_rate: speakingRates[currentSpeakingRateIndex],
        private_profile: profilePrivacy === 'private',
      });

      await updateSettings(data);

      const successMessage = 'Configurações atualizadas com sucesso!';

      await speech(successMessage, data.speaking_rate);

      Alert.alert(successMessage);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao salvar as configurações, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
    setSubmitLoading(false);
  };

  const handleNextFont = () => {
    setCurrentFontIndex(currentFontIndex + 1);
  };

  const handlePrevFont = () => {
    setCurrentFontIndex(currentFontIndex - 1);
  };

  const handleNextSpeakingRate = () => {
    setCurrentSpeakingRateIndex(currentSpeakingRateIndex + 1);
  };

  const handlePrevSpeakingRate = () => {
    setCurrentSpeakingRateIndex(currentSpeakingRateIndex - 1);
  };

  const handleDeleteAccount = async () => {
    setDeleteAccountLoading(true);
    try {
      await api.delete('/users');

      await signOut();

      await removeSettings();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao excluir sua conta, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <Container source={bgImg}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left-circle" size={32} color="#fff" />
          </TouchableOpacity>

          <TextToSpeechButton text="Nesta tela você pode escolher a fonte dos textos do aplicativo, a velocidade das instruções por áudio, como essa, e escolher a privacidade do seu perfil. Se você escolher um perfil privado, você não irá aparecer no ranking." />
        </Header>

        <Title fontWeight="bold">Fonte</Title>
        <FontContainer>
          <TouchableOpacity
            onPress={handlePrevFont}
            disabled={!(currentFontIndex > 0)}
          >
            <Icon
              name="chevron-left"
              size={40}
              color={currentFontIndex > 0 ? '#fff' : '#adadad'}
            />
          </TouchableOpacity>

          <FontExampleText font={fonts[currentFontIndex]}>
            {fonts[currentFontIndex].toString()}
          </FontExampleText>

          <TouchableOpacity
            onPress={handleNextFont}
            disabled={!(currentFontIndex < fonts.length - 1)}
          >
            <Icon
              name="chevron-right"
              size={40}
              color={currentFontIndex < fonts.length - 1 ? '#fff' : '#adadad'}
            />
          </TouchableOpacity>
        </FontContainer>

        <Title fontWeight="bold">Velocidade dos áudios</Title>
        <SpeakingRateContainer>
          <TouchableOpacity
            onPress={handlePrevSpeakingRate}
            disabled={!(currentSpeakingRateIndex > 0)}
          >
            <Icon
              name="chevron-left"
              size={40}
              color={currentSpeakingRateIndex > 0 ? '#fff' : '#adadad'}
            />
          </TouchableOpacity>

          <SpeakingRateText fontWeight="medium">
            {speakingRates[currentSpeakingRateIndex].toString()}
          </SpeakingRateText>

          <TouchableOpacity
            onPress={handleNextSpeakingRate}
            disabled={!(currentSpeakingRateIndex < speakingRates.length - 1)}
          >
            <Icon
              name="chevron-right"
              size={40}
              color={
                currentSpeakingRateIndex < speakingRates.length - 1
                  ? '#fff'
                  : '#adadad'
              }
            />
          </TouchableOpacity>
        </SpeakingRateContainer>

        <Title fontWeight="bold">Privacidade do perfil</Title>
        <ProfilePrivacyContainer>
          <ProfilePrivacyButton
            onPress={() => setProfilePrivacy('public')}
            selected={profilePrivacy === 'public'}
          >
            <Image source={orangeAstronautImg} />

            <ProfilePrivacyButtonText fontWeight="bold">
              Público
            </ProfilePrivacyButtonText>
          </ProfilePrivacyButton>
          <ProfilePrivacyButton
            onPress={() => setProfilePrivacy('private')}
            selected={profilePrivacy === 'private'}
          >
            <Image source={darkAstronautImg} />

            <ProfilePrivacyButtonText fontWeight="bold">
              Privado
            </ProfilePrivacyButtonText>
          </ProfilePrivacyButton>
        </ProfilePrivacyContainer>

        <DeleteAccountButton
          loading={deleteAccountLoading}
          onPress={handleDeleteAccount}
        >
          Excluir conta
        </DeleteAccountButton>
        <Button loading={submitLoading} onPress={handleSubmit}>
          Salvar
        </Button>
      </Container>
    </ScrollView>
  );
};

export default Settings;
