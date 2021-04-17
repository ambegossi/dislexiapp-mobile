import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Recorder } from '@react-native-community/audio-toolkit';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import api from '../../services/api';

import bgImg from '../../assets/images/bg.png';
import audioWave from '../../assets/icons/audioWave.png';

import {
  Container,
  Header,
  Wrapper,
  Image,
  WordContainer,
  Word,
  AudioWaveContainer,
  AudioWaveImage,
  MicButton,
} from './styles';

const filename = 'audio.aac';

const Naming = ({ route }) => {
  const { stimulusList, namingType } = route.params;

  const navigation = useNavigation();

  const [currentStimulus, setCurrentStimulus] = useState(stimulusList[0]);
  const [currentStimulusListIndex, setCurrentStimulusListIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recognitionLoading, setRecognitionLoading] = useState(false);

  const handleNext = () => {
    if (currentStimulusListIndex < stimulusList.length - 1) {
      setCurrentStimulus(stimulusList[currentStimulusListIndex + 1]);
      setCurrentStimulusListIndex(currentStimulusListIndex + 1);

      setProgress(progress + 1);
    } else {
      navigation.navigate('NamingConcluded', {
        stimulusList,
        namingType,
        results,
      });
    }
  };

  const reloadRecorder = async () => {
    if (recorder) {
      await recorder.destroy();
    }

    const newRecorder = new Recorder(filename, {
      // bitrate: 256000,
      // sampleRate: 16000,
      format: 'aac',
      quality: 'max',
    });

    setRecorder(newRecorder);
  };

  useEffect(() => {
    reloadRecorder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestRecordAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissão de microfone',
          message: 'O aplicativo necessita de acesso ao seu microfone.',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const startRecording = async () => {
    let hasRecordAudioPermission = true;

    if (Platform.OS === 'android') {
      hasRecordAudioPermission = await requestRecordAudioPermission();
    }

    if (hasRecordAudioPermission) {
      setRecording(true);

      try {
        await recorder.prepare();
        await recorder.record();
      } catch (err) {
        console.error('erro recording', err);
      }
    }
  };

  const handleRecognizeAudio = async path => {
    const formData = new FormData();

    formData.append('audio', {
      type: 'audio/aac',
      name: 'audio.aac',
      uri: `file://${path}`,
    });

    formData.append('word', currentStimulus.word);

    setRecognitionLoading(true);

    try {
      const { data } = await api.post('/stimulus/recognize', formData);

      if (data.recognized) {
        const result = {
          stimulus: currentStimulus,
          recognized: true,
          isCorrect: data.recognition.isCorrect,
        };

        setResults(resultsState => [...resultsState, result]);
      }
    } catch (err) {
      console.error('error recognizing', err);
    }

    setRecognitionLoading(false);
  };

  const stopRecording = async () => {
    await recorder.stop();
    setRecording(false);
    // new Player('audio.aac').play();
    const audioPath = recorder.fsPath;
    await handleRecognizeAudio(audioPath);
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
          <ProgressBar progress={progress} width={170} total={5} />
        </Header>

        <Wrapper>
          {namingType === 'words' ? (
            <WordContainer>
              <Word>{currentStimulus.word}</Word>
            </WordContainer>
          ) : (
            <Image
              source={{
                uri: currentStimulus.image_url,
              }}
              resizeMode="contain"
            />
          )}

          {recording && (
            <AudioWaveContainer>
              <AudioWaveImage resizeMode="contain" source={audioWave} />
            </AudioWaveContainer>
          )}

          {recognitionLoading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <MicButton onPressIn={startRecording} onPressOut={stopRecording}>
              <Icon
                name="mic"
                size={35}
                color={
                  results.length > 0 &&
                  !!results[currentStimulusListIndex] &&
                  results[currentStimulusListIndex].recognized
                    ? '#04d361'
                    : '#000'
                }
              />
            </MicButton>
          )}
        </Wrapper>

        <Button onPress={handleNext}>Avançar</Button>
      </Container>
    </ScrollView>
  );
};

Naming.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      stimulusList: PropTypes.arrayOf(
        PropTypes.shape({
          image_url: PropTypes.string.isRequired,
          word: PropTypes.string.isRequired,
        }),
      ).isRequired,
      namingType: PropTypes.oneOf(['words', 'figures']).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Naming;