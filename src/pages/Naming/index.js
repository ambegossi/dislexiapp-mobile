import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Recorder } from '@react-native-community/audio-toolkit';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import ProgressBar from '../../components/ProgressBar';

import { useAuth } from '../../hooks/auth';
import { useSettings } from '../../hooks/settings';
import api from '../../services/api';
import { playAudio } from '../../utils/audio';
import { speech } from '../../utils/voice';
import sleep from '../../utils/sleep';
import { deleteFile } from '../../utils/file';

import bgImg from '../../assets/images/bg.png';
import audioWave from '../../assets/icons/audioWave.png';
import astronautGreenFlag from '../../assets/images/astronautGreenFlag.png';
import astronautRedFlag from '../../assets/images/astronautRedFlag.png';

import {
  Background,
  Header,
  Wrapper,
  ResultImage,
  Image,
  WordContainer,
  Word,
  AudioWaveContainer,
  AudioWaveImage,
  MicButtonContainer,
  RefreshIcon,
  MicButton,
  Button,
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

  const getScoreEarned = level => {
    if (level < 10) {
      return 10;
    }

    if (level < 30) {
      return 5;
    }

    return 3;
  };

  const handleUpdateProfile = async () => {
    setUpdateProfileLoading(true);
    try {
      const { score, level } = user.profile;

      const scoreEarned = getScoreEarned(level);

      const newScore = score + scoreEarned;

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
  };

  const reloadRecorder = async () => {
    if (recorder) {
      await recorder.destroy();
    }

    const newRecorder = new Recorder(filename, {
      format: 'aac',
      quality: 'max',
    });

    setRecorder(newRecorder);
  };

  useEffect(() => {
    reloadRecorder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async () => {
    setRecording(true);

    try {
      await recorder.prepare();
      await recorder.record();
    } catch (err) {
      console.error('error recording', err);
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

    await deleteFile(path);

    setRecognitionLoading(false);
  };

  const stopRecording = async () => {
    setRecording(false);
    setRecognitionLoading(true);

    await sleep(900);

    await recorder.stop();
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
          <ProgressBar progress={progress} width={170} total={5} />
        </Header>

        <Wrapper>
          {step === 2 && !!results[currentStimulusListIndex] && (
            <ResultImage
              source={
                results[currentStimulusListIndex].isCorrect
                  ? astronautGreenFlag
                  : astronautRedFlag
              }
            />
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
            <MicButtonContainer>
              {step === 2 &&
                results[currentStimulusListIndex] &&
                !results[currentStimulusListIndex].isCorrect && (
                  <RefreshIcon>
                    <Icon name="refresh-ccw" size={14} color="#131315" />
                  </RefreshIcon>
                )}
              <MicButton onPressIn={startRecording} onPressOut={stopRecording}>
                <Icon name="mic" size={35} color={getMicIconColor()} />
              </MicButton>
            </MicButtonContainer>
          )}
        </Wrapper>

        <Button
          icon={<Icon name="chevron-right" size={24} color="#fff" />}
          loading={updateProfileLoading}
          onPress={handleNext}
          enabled={
            (step === 2 &&
              !!results[currentStimulusListIndex] &&
              results[currentStimulusListIndex].isCorrect) ||
            step === 1
          }
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
