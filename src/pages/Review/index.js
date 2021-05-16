import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import { playAudio } from '../../utils/audio';
import { speech } from '../../utils/voice';
import { useSettings } from '../../hooks/settings';

import bgImg from '../../assets/images/bg.png';

import {
  Background,
  Header,
  Wrapper,
  ResultIcon,
  StimulusImage,
  WordContainer,
  Word,
  SoundButton,
} from './styles';

const Review = ({ route }) => {
  const { stimulusList, namingType, results } = route.params;

  const navigation = useNavigation();

  const { settings } = useSettings();

  const [currentStimulus, setCurrentStimulus] = useState(stimulusList[0]);
  const [currentResult, setCurrentResult] = useState(results[0]);
  const [currentStimulusListIndex, setCurrentStimulusListIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [speechLoading, setSpeechLoading] = useState(false);

  const handleNext = () => {
    if (currentStimulusListIndex < stimulusList.length - 1) {
      setCurrentStimulus(stimulusList[currentStimulusListIndex + 1]);
      setCurrentStimulusListIndex(currentStimulusListIndex + 1);
      setCurrentResult(results[currentStimulusListIndex + 1]);

      setProgress(progress + 1);
    } else {
      navigation.navigate('ReviewCompleted', {
        stimulusList,
        namingType,
      });
    }
  };

  useEffect(() => {
    if (currentResult.isCorrect) {
      playAudio('correct.wav', true);
    } else {
      playAudio('wrong.wav', true);
    }
  }, [currentResult]);

  const handleSpeech = async () => {
    setSpeechLoading(true);

    await speech(currentStimulus.word, settings.speaking_rate);

    setSpeechLoading(false);
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
          <ResultIcon isCorrect={currentResult.isCorrect}>
            <Icon
              name={currentResult.isCorrect ? 'check' : 'x'}
              size={28}
              color="#fff"
            />
          </ResultIcon>

          <StimulusImage
            source={{
              uri: currentStimulus.image_url,
            }}
            resizeMode="contain"
          />

          <WordContainer>
            <Word fontWeight="bold">{currentStimulus.word}</Word>
          </WordContainer>

          <SoundButton onPress={handleSpeech}>
            {speechLoading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Icon name="volume-2" size={35} color="#000" />
            )}
          </SoundButton>
        </Wrapper>

        <Button
          icon={<Icon name="chevron-right" size={24} color="#fff" />}
          onPress={handleNext}
        >
          Avançar
        </Button>
      </Background>
    </ScrollView>
  );
};

Review.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      stimulusList: PropTypes.arrayOf(
        PropTypes.shape({
          image_url: PropTypes.string.isRequired,
          word: PropTypes.string.isRequired,
        }),
      ).isRequired,
      namingType: PropTypes.oneOf(['words', 'figures']).isRequired,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          isCorrect: PropTypes.bool.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Review;
