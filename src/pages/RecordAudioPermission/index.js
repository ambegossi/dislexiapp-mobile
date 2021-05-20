import React, { useEffect } from 'react';
import { ScrollView, PermissionsAndroid, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

import { playAudio } from '../../utils/audio';

import bgImg from '../../assets/images/bg.png';
import micImg from '../../assets/images/mic.png';

import { Background, Text } from './styles';

const RecordAudioPermission = ({ route }) => {
  const {
    stimulusList,
    namingType,
    step,
    alreadyNamedWords,
    alreadyNamedFigures,
  } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    playAudio('mic_permission.wav', true);
  }, []);

  const requestRecordAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissão de microfone',
          message: 'O aplicativo necessita de acesso ao seu microfone.',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Permitir',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (
          (namingType === 'words' && !alreadyNamedWords) ||
          (namingType === 'figures' && !alreadyNamedFigures)
        ) {
          navigation.navigate('Instructions', {
            stimulusList,
            namingType,
            step,
          });
        } else {
          navigation.navigate('Naming', {
            stimulusList,
            namingType,
            step,
          });
        }
      }
    } catch (err) {
      console.error(err);
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
      <Background source={bgImg}>
        <Image source={micImg} />

        <Text fontWeight="medium">
          Você deve permitir que o aplicativo use seu microfone. Toque no botão
          abaixo, e depois escolha a opção permitir.
        </Text>

        <Button onPress={requestRecordAudioPermission}>Permitir</Button>
      </Background>
    </ScrollView>
  );
};

RecordAudioPermission.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      stimulusList: PropTypes.arrayOf(
        PropTypes.shape({
          image_url: PropTypes.string.isRequired,
          word: PropTypes.string.isRequired,
        }),
      ).isRequired,
      namingType: PropTypes.oneOf(['words', 'figures']).isRequired,
      step: PropTypes.number.isRequired,
      alreadyNamedWords: PropTypes.bool.isRequired,
      alreadyNamedFigures: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecordAudioPermission;
