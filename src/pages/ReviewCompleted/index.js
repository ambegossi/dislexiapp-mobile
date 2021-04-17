import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import { playAudio } from '../../utils/audio';

import bgImg from '../../assets/images/bg.png';
import check from '../../assets/animations/check.json';

import { Container, Header } from './styles';

const ReviewCompleted = ({ route }) => {
  const { stimulusList, namingType } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    playAudio('completed.wav');
  }, []);

  const handleNaming = () => {
    navigation.replace('Naming', {
      stimulusList,
      namingType,
    });
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
          <ProgressBar progress={5} width={170} total={5} />
        </Header>

        <LottieView
          source={check}
          autoPlay
          loop={false}
          style={{ width: 230 }}
        />

        <Button onPress={handleNaming}>Continuar</Button>
      </Container>
    </ScrollView>
  );
};

ReviewCompleted.propTypes = {
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

export default ReviewCompleted;
