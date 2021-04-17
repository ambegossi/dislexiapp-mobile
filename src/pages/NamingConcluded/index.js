import React from 'react';
import { ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import bgImg from '../../assets/images/bg.png';
import check from '../../assets/animations/check.json';

import { Container, Header } from './styles';

const NamingConcluded = ({ route }) => {
  const { stimulusList, results } = route.params;

  const navigation = useNavigation();

  const handleReview = () => {
    navigation.navigate('Review', {
      stimulusList,
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
      <Container source={bgImg}>
        <Header>
          <ProgressBar progress={5} width={170} total={5} />
        </Header>

        <LottieView source={check} autoPlay style={{ width: 230 }} />

        <Button onPress={handleReview}>Revisar</Button>
      </Container>
    </ScrollView>
  );
};

NamingConcluded.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      stimulusList: PropTypes.arrayOf(
        PropTypes.shape({
          image_url: PropTypes.string.isRequired,
          word: PropTypes.string.isRequired,
        }),
      ).isRequired,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          isCorrect: PropTypes.bool.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NamingConcluded;
