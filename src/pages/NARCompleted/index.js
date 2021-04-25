import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import { playAudio } from '../../utils/audio';

import bgImg from '../../assets/images/bg.png';
import medal from '../../assets/animations/medal.json';

import { Container, Header, Text } from './styles';

const NARCompleted = () => {
  const navigation = useNavigation();

  useEffect(() => {
    playAudio('success.wav', true);
  }, []);

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
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
          source={medal}
          autoPlay
          loop={false}
          style={{ width: 330 }}
          speed={0.8}
        />

        <Text>Mandou bem!</Text>

        <Button onPress={handleDashboard}>Ok</Button>
      </Container>
    </ScrollView>
  );
};

export default NARCompleted;
