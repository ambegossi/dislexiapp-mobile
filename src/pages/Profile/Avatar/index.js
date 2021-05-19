import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import TextToSpeechButton from '../../../components/TextToSpeechButton';

import { useAuth } from '../../../hooks/auth';
import { useSettings } from '../../../hooks/settings';
import api from '../../../services/api';
import { speech } from '../../../utils/voice';

import bgImg from '../../../assets/images/bg.png';
import avatarDefaultImg from '../../../assets/images/avatarDefault.png';

import {
  Background,
  Container,
  Header,
  AvatarWrapper,
  UserAvatar,
  Button,
} from './styles';

const Avatar = ({ route }) => {
  const { avatarId } = route.params;

  const navigation = useNavigation();

  const { updateUser } = useAuth();
  const { settings } = useSettings();

  const [avatars, setAvatars] = useState([]);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

  const loadAvatars = useCallback(async () => {
    try {
      const { data } = await api.get('/avatars');

      const findCurrentAvatarIndex = avatarId
        ? data.findIndex(avatar => avatar.id === avatarId)
        : -1;

      setCurrentAvatarIndex(findCurrentAvatarIndex);

      setAvatars(data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao carregar os avatares, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
  }, [avatarId, settings.speaking_rate]);

  useEffect(() => {
    loadAvatars();
  }, [loadAvatars]);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const { data } = await api.patch('/profile/avatar', {
        avatar_id:
          currentAvatarIndex === -1 ? null : avatars[currentAvatarIndex].id,
      });

      await updateUser(data);

      const successMessage = 'Avatar atualizado com sucesso!';

      await speech(successMessage, settings.speaking_rate);

      Alert.alert(successMessage);

      navigation.goBack();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao salvar o avatar, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
    setSubmitLoading(false);
  };

  const handleNextAvatar = () => {
    setCurrentAvatarIndex(currentAvatarIndex + 1);
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex(currentAvatarIndex - 1);
  };

  return (
    <Background source={bgImg}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left-circle" size={32} color="#fff" />
            </TouchableOpacity>

            <TextToSpeechButton text="Escolha seu avatar, e toque no botão rosa para salvar." />
          </Header>

          {avatars.length === 0 ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <AvatarWrapper>
              <TouchableOpacity
                onPress={handlePrevAvatar}
                disabled={!(currentAvatarIndex >= 0)}
              >
                <Icon
                  name="chevron-left"
                  size={56}
                  color={currentAvatarIndex >= 0 ? '#fff' : '#adadad'}
                />
              </TouchableOpacity>

              <UserAvatar
                source={
                  currentAvatarIndex === -1
                    ? avatarDefaultImg
                    : {
                        uri: avatars[currentAvatarIndex].image_url,
                      }
                }
              />

              <TouchableOpacity
                onPress={handleNextAvatar}
                disabled={!(currentAvatarIndex < avatars.length - 1)}
              >
                <Icon
                  name="chevron-right"
                  size={56}
                  color={
                    currentAvatarIndex < avatars.length - 1 ? '#fff' : '#adadad'
                  }
                />
              </TouchableOpacity>
            </AvatarWrapper>
          )}

          <Button loading={submitLoading} onPress={handleSubmit}>
            Salvar
          </Button>
        </Container>
      </ScrollView>
    </Background>
  );
};

Avatar.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      avatarId: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Avatar;