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

import { Background, Header } from './styles';

const NamingCompleted = ({ route }) => {
  const { stimulusList, namingType, results } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    playAudio('completed.wav', true);
  }, []);

  const handleReview = () => {
    navigation.navigate('Review', {
      stimulusList,
      namingType,
      results,
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
      <Background source={bgImg}>
        <Header>
          <ProgressBar progress={5} width={170} total={5} />
        </Header>

        <LottieView
          source={check}
          autoPlay
          loop={false}
          style={{ width: 230, marginBottom: 35 }}
        />

        <Button onPress={handleReview}>Revisar</Button>
      </Background>
    </ScrollView>
  );
};

NamingCompleted.propTypes = {
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

export default NamingCompleted;
