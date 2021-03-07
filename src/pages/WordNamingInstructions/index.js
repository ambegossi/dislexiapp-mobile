import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import TextToSpeechButton from '../../components/TextToSpeechButton';
import Button from '../../components/Button';

import bgImg from '../../assets/images/bg.png';
import moonRun from '../../assets/animations/moonRun.json';

import { Container, Header, Text } from './styles';

const WordNamingInstructions = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleStart = () => {};

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left-circle" size={32} color="#fff" />
          </TouchableOpacity>

          <TextToSpeechButton text="Toque no botão rosa para começar, e nomeie as palavras o mais rápido que conseguir!" />
        </Header>

        <LottieView source={moonRun} autoPlay loop style={{ width: 230 }} />

        <Text>Nomeie as palavras o mais rápido que conseguir!</Text>

        <Button loading={loading} onPress={handleStart}>
          Começar
        </Button>
      </Container>
    </ScrollView>
  );
};

export default WordNamingInstructions;
