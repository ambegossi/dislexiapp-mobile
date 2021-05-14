import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Recorder } from '@react-native-community/audio-toolkit';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import { useAuth } from '../../hooks/auth';
import { useSettings } from '../../hooks/settings';
import api from '../../services/api';
import { playAudio } from '../../utils/audio';
import { speech } from '../../utils/voice';

import bgImg from '../../assets/images/bg.png';
import audioWave from '../../assets/icons/audioWave.png';

import {
  Background,
  Header,
  Wrapper,
  ResultIcon,
  Image,
  WordContainer,
  Word,
  AudioWaveContainer,
  AudioWaveImage,
  MicButton,
} from './styles';

const filename = 'audio.aac';

const Naming = ({ route }) => {
  const { stimulusList, namingType, step } = route.params;

  const navigation = useNavigation();

  const { user, updateUser } = useAuth();
  const { settings } = useSettings();

  const [currentStimulus, setCurrentStimulus] = useState(stimulusList[0]);
  const [currentStimulusListIndex, setCurrentStimulusListIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recognitionLoading, setRecognitionLoading] = useState(false);
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

  const addNewResult = result => {
    const newResults = results;

    newResults[currentStimulusListIndex] = result;

    setResults(newResults);

    if (step === 2) {
      if (result.isCorrect) {
        playAudio('correct.wav', true);
      } else {
        playAudio('wrong.wav', true);
      }
    }
  };

  const handleUpdateProfile = async () => {
    setUpdateProfileLoading(true);
    try {
      const { score, level } = user.profile;

      const newScore = score + 5;

      const data = {
        score: newScore,
        level: newScore % 30 === 0 ? level + 1 : level,
      };

      const response = await api.put('/profile', data);

      await updateUser(response.data);

      navigation.navigate('NARCompleted');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Ocorreu um erro ao concluir, tente novamente.';

      await speech(errorMessage, settings.speaking_rate);

      Alert.alert('Ops...', errorMessage);
    }
    setUpdateProfileLoading(false);
  };

  const handleNext = async () => {
    if (step === 1 && !results[currentStimulusListIndex]) {
      const result = {
        stimulus: currentStimulus,
        recognized: false,
        isCorrect: false,
      };

      addNewResult(result);
    }

    if (
      step === 1 ||
      (!!results[currentStimulusListIndex] &&
        results[currentStimulusListIndex].isCorrect)
    ) {
      if (currentStimulusListIndex < stimulusList.length - 1) {
        setCurrentStimulus(stimulusList[currentStimulusListIndex + 1]);
        setCurrentStimulusListIndex(currentStimulusListIndex + 1);

        setProgress(progress + 1);
      } else if (step === 1) {
        navigation.navigate('NamingCompleted', {
          stimulusList,
          namingType,
          results,
        });
      } else {
        await handleUpdateProfile();
      }
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
        console.error('error recording', err);
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

      const result = {
        stimulus: currentStimulus,
        recognized: data.recognized,
        isCorrect: data.recognition ? data.recognition.isCorrect : false,
      };

      addNewResult(result);
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

  const getMicIconColor = () => {
    if (step === 1) {
      return results.length > 0 && !!results[currentStimulusListIndex]
        ? '#04d361'
        : '#000';
    }

    if (results[currentStimulusListIndex]) {
      return results[currentStimulusListIndex].isCorrect
        ? '#04d361'
        : '#ca0000';
    }

    return '#000';
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
        <Header>
          <ProgressBar progress={progress} width={170} total={2} />
        </Header>

        <Wrapper>
          {step === 2 && !!results[currentStimulusListIndex] && (
            <ResultIcon isCorrect={results[currentStimulusListIndex].isCorrect}>
              <Icon
                name={
                  results[currentStimulusListIndex].isCorrect ? 'check' : 'x'
                }
                size={33}
                color="#fff"
              />
            </ResultIcon>
          )}
          {namingType === 'words' ? (
            <WordContainer>
              <Word fontWeight="bold">{currentStimulus.word}</Word>
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
              <Icon name="mic" size={35} color={getMicIconColor()} />
            </MicButton>
          )}
        </Wrapper>

        <Button
          icon={<Icon name="chevron-right" size={24} color="#fff" />}
          loading={updateProfileLoading}
          onPress={handleNext}
        >
          Avançar
        </Button>
      </Background>
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
      step: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Naming;
