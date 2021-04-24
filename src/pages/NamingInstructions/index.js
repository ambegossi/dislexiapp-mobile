import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import TextToSpeechButton from '../../components/TextToSpeechButton';
import Button from '../../components/Button';

import bgImg from '../../assets/images/bg.png';
import moonRun from '../../assets/animations/moonRun.json';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { playAudio } from '../../utils/audio';

import { Container, Header, Text } from './styles';

const NamingInstructions = ({ route }) => {
  const { namingType } = route.params;

  const navigation = useNavigation();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/stimulus/${user.profile_id}`, {
        params: { number: 2 },
      });

      navigation.navigate('Naming', {
        stimulusList: data,
        namingType,
      });
    } catch (err) {
      Alert.alert(
        'Erro',
        err.response?.data?.message ||
          'Ocorreu um erro ao começar, tente novamente.',
      );
    }
    setLoading(false);
  };

  const audioInstruction =
    namingType === 'words'
      ? 'Toque no botão rosa para começar, e nomeie as palavras o mais rápido que conseguir!'
      : 'Toque no botão rosa para começar, e nomeie as figuras o mais rápido que conseguir!';

  const text =
    namingType === 'words'
      ? 'Nomeie as palavras o mais rápido que conseguir!'
      : 'Nomeie as figuras o mais rápido que conseguir!';

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
      <Container source={bgImg}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left-circle" size={32} color="#fff" />
          </TouchableOpacity>

          <TextToSpeechButton text={audioInstruction} />
        </Header>

        <LottieView source={moonRun} autoPlay loop style={{ width: 220 }} />

        <Text>{text}</Text>

        <Button loading={loading} onPress={handleStart}>
          Começar
        </Button>
      </Container>
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
