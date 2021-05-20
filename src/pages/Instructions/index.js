import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { useSettings } from '../../hooks/settings';
import { playAudio } from '../../utils/audio';

import firstStepNamingWordsGif from '../../assets/gifs/firstStepNamingWords.gif';
import reviewWordsGif from '../../assets/gifs/reviewWords.gif';
import secondStepNamingWordsGif from '../../assets/gifs/secondStepNamingWords.gif';
import firstStepNamingFiguresGif from '../../assets/gifs/firstStepNamingFigures.gif';
import reviewFiguresGif from '../../assets/gifs/reviewFigures.gif';
import secondStepNamingFiguresGif from '../../assets/gifs/secondStepNamingFigures.gif';
import rocketImg from '../../assets/images/rocket.png';

import {
  Container,
  CardContainer,
  Card,
  PaginationContainer,
  PaginationDotsContainer,
  PaginationDot,
  ButtonContainer,
  Button,
} from './styles';

const Instructions = ({ route }) => {
  const { stimulusList, namingType, step } = route.params;

  const navigation = useNavigation();

  const { width } = Dimensions.get('window');

  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();

  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    if (currentPage === 0) {
      playAudio(
        namingType === 'words'
          ? 'first_step_naming_words.wav'
          : 'first_step_naming_figures.wav',
        true,
      );
    } else if (currentPage === 1) {
      playAudio(
        namingType === 'words' ? 'review_words.wav' : 'review_figures.wav',
        true,
      );
    } else if (currentPage === 2) {
      playAudio(
        namingType === 'words'
          ? 'second_step_naming_words.wav'
          : 'second_step_naming_figures.wav',
        true,
      );
    } else if (currentPage === 3) {
      playAudio('enjoy.wav', true);
    }
  }, [currentPage, namingType]);

  const setSliderPage = event => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);

    if (indexOfNextScreen !== currentPage) {
      setCurrentPage(indexOfNextScreen);
    }
  };

  const moveBody = index => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animation: false,
    });
  };

  const handleNextPage = () => {
    moveBody(currentPage + 1);
  };

  const handlePrevPage = () => {
    moveBody(currentPage - 1);
  };

  const handleStart = async () => {
    setLoading(true);

    if (namingType === 'words') {
      await updateSettings({
        font_family: settings.font_family,
        speaking_rate: settings.speaking_rate,
        private_profile: settings.private_profile,
        alreadyNamedFigures: settings.alreadyNamedFigures,
        alreadyNamedWords: true,
      });
    }

    if (namingType === 'figures') {
      await updateSettings({
        font_family: settings.font_family,
        speaking_rate: settings.speaking_rate,
        private_profile: settings.private_profile,
        alreadyNamedWords: settings.alreadyNamedWords,
        alreadyNamedFigures: true,
      });
    }

    navigation.navigate('Naming', {
      stimulusList,
      namingType,
      step,
    });
  };

  return (
    <Container>
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          setSliderPage(event);
        }}
        ref={scrollViewRef}
      >
        <CardContainer>
          <Card>
            <Image
              source={
                namingType === 'words'
                  ? firstStepNamingWordsGif
                  : firstStepNamingFiguresGif
              }
              style={{
                width: 230,
                height: 200,
              }}
              resizeMode="contain"
            />
          </Card>
        </CardContainer>
        <CardContainer>
          <Card>
            <Image
              source={
                namingType === 'words' ? reviewWordsGif : reviewFiguresGif
              }
              style={{
                width: 230,
                height: 200,
              }}
              resizeMode="contain"
            />
          </Card>
        </CardContainer>
        <CardContainer>
          <Card>
            <Image
              source={
                namingType === 'words'
                  ? secondStepNamingWordsGif
                  : secondStepNamingFiguresGif
              }
              style={{
                width: 230,
                height: 200,
              }}
              resizeMode="contain"
            />
          </Card>
        </CardContainer>
        <CardContainer>
          <Image source={rocketImg} />
        </CardContainer>
      </ScrollView>
      <PaginationContainer>
        {currentPage > 0 ? (
          <TouchableOpacity onPress={handlePrevPage}>
            <Icon name="arrow-left-circle" size={32} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}

        <PaginationDotsContainer>
          {Array.from(Array(4).keys()).map((key, index) => (
            <PaginationDot
              opacity={currentPage === index ? 1 : 0.2}
              key={index}
            />
          ))}
        </PaginationDotsContainer>

        {currentPage < 3 ? (
          <TouchableOpacity onPress={handleNextPage}>
            <Icon name="arrow-right-circle" size={32} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </PaginationContainer>

      {currentPage === 3 ? (
        <ButtonContainer>
          <Button loading={loading} onPress={handleStart}>
            Começar
          </Button>
        </ButtonContainer>
      ) : (
        <View style={{ height: 60, marginTop: 40 }} />
      )}
    </Container>
  );
};

Instructions.propTypes = {
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

export default Instructions;
