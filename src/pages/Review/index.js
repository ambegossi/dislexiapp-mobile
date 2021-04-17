import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import bgImg from '../../assets/images/bg.png';

import {
  Container,
  Header,
  Wrapper,
  ResultIcon,
  StimulusImage,
  WordContainer,
  Word,
} from './styles';

const Review = ({ route }) => {
  const { stimulusList, namingType, results } = route.params;

  const navigation = useNavigation();

  const [currentStimulus, setCurrentStimulus] = useState(stimulusList[0]);
  const [currentStimulusListIndex, setCurrentStimulusListIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (currentStimulusListIndex < stimulusList.length - 1) {
      setCurrentStimulus(stimulusList[currentStimulusListIndex + 1]);
      setCurrentStimulusListIndex(currentStimulusListIndex + 1);

      setProgress(progress + 1);
    } else {
      navigation.navigate('Naming', {
        stimulusList,
        namingType,
      });
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
          <ProgressBar progress={progress} width={170} total={5} />
        </Header>

        <Wrapper>
          <ResultIcon isCorrect={results[currentStimulusListIndex].isCorrect}>
            <Icon
              name={results[currentStimulusListIndex].isCorrect ? 'check' : 'x'}
              size={33}
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
            <Word>{currentStimulus.word}</Word>
          </WordContainer>
        </Wrapper>

        <Button onPress={handleNext}>Avançar</Button>
      </Container>
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
