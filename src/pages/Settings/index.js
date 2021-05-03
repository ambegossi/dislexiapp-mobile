import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import TextToSpeechButton from '../../components/TextToSpeechButton';

import bgImg from '../../assets/images/bg.png';

import { Container, Header } from './styles';

const Settings = () => {
  const navigation = useNavigation();

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

          <TextToSpeechButton text="Configs" />
        </Header>
      </Container>
    </ScrollView>
  );
};

export default Settings;
