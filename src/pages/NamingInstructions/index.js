import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import TextToSpeechButton from '../../components/TextToSpeechButton';
import Button from '../../components/Button';

import bgImg from '../../assets/images/bg.png';
import moonRun from '../../assets/animations/moonRun.json';
import { useAuth } from '../../hooks/auth';
import { useSettings } from '../../hooks/settings';
import api from '../../services/api';
import { playAudio } from '../../utils/audio';
import { speech } from '../../utils/voice';

import { Background, Header, Text } from './styles';

const NamingInstructions = ({ route }) => {
  const { namingType } = route.params;

  const navigation = useNavigation();

  const { user } = useAuth();
  const { settings } = useSettings();

  const [loading, setLoading] = useState(false);

  const checkRecordAudioPermission = async () => {
    try {
      const recordAudioPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      return recordAudioPermission;
    } catch (err) {
      return false;
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/stimulus/${user.profile_id}`, {
        params: { number: 5 },
      });

      if (Platform.OS === 'android') {
        const audioRecordingAllowed = await checkRecordAudioPermission();

        if (!audioRecordingAllowed) {
          navigation.navigate('RecordAudioPermission', {
            stimulusList: data,
            namingType,
            step: 1,
          });
        } else {
          navigation.navigate('Naming', {
            stimulusList: data,
            namingType,
            step: 1,
          });
        }
      } else {
        navigation.navigate('Naming', {
          stimulusList: data,
          namingType,
          step: 1,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao começar, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
    setLoading(false);
  };

  const audioInstruction =
    namingType === 'words'
      ? 'Toque no botão rosa para começar, e tente ler as palavras o mais rápido que conseguir!'
      : 'Toque no botão rosa para começar, e tente falar o que é cada figura que aparecer na tela, o mais rápido que conseguir!';

  const text =
    namingType === 'words'
      ? 'Tente ler as palavras o mais rápido que conseguir!'
      : 'Tente falar o que é cada figura que aparecer na tela, o mais rápido que conseguir!';

  useEffect(() => {
    if (namingType === 'words') {
      playAudio('nomeie_palavras.wav', true);
    } else {
      playAudio('nomeie_figuras.wav', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <Background source={bgImg}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left-circle" size={32} color="#fff" />
          </TouchableOpacity>

          <TextToSpeechButton text={audioInstruction} />
        </Header>

        <LottieView source={moonRun} autoPlay loop style={{ width: 220 }} />

        <Text fontWeight="medium">{text}</Text>

        <Button loading={loading} onPress={handleStart}>
          Começar
        </Button>
      </Background>
    </ScrollView>
  );
};

NamingInstructions.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      namingType: PropTypes.oneOf(['words', 'figures']).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NamingInstructions;
