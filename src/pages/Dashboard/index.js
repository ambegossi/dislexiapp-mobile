import React, { useCallback } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TextToSpeechButton from '../../components/TextToSpeechButton';

import { useAuth } from '../../hooks/auth';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

import dashboardBgImg from '../../assets/images/dashboardBg.png';
import writingImg from '../../assets/images/writing.png';
import astronautImg from '../../assets/images/astronaut.png';

import {
  Header,
  ProfileContainer,
  UserName,
  UserAvatar,
  NamingButton,
  NamingImageWrapper,
  NamingImage,
  NamingBottomContainer,
  NamingTitle,
} from './styles';

const Dashboard = () => {
  const { user } = useAuth();

  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToNamingInstructions = useCallback(
    namingType => {
      navigate('NamingInstructions', {
        namingType,
      });
    },
    [navigate],
  );

  return (
    <ImageBackground
      source={dashboardBgImg}
      style={{
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
      >
        <Header>
          <TextToSpeechButton
            text={`Bem-vindo ${user.name}! Toque no seu avatar para acessar seu perfil. Para iniciar a nomeação de palavras, toque no card rosa abaixo. Para iniciar a nomeação de figuras, toque no card verde.`}
          />

          <ProfileContainer>
            <UserName>{capitalizeFirstLetter(user.name)}</UserName>
            <TouchableOpacity onPress={navigateToProfile}>
              <UserAvatar
                source={{
                  uri:
                    'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
                }}
              />
            </TouchableOpacity>
          </ProfileContainer>
        </Header>

        <NamingButton onPress={() => navigateToNamingInstructions('words')}>
          <NamingImageWrapper
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#a507bc', '#2e3474']}
          >
            <NamingImage source={writingImg} />
          </NamingImageWrapper>
          <NamingBottomContainer>
            <NamingTitle>Palavras</NamingTitle>
          </NamingBottomContainer>
        </NamingButton>

        <NamingButton onPress={() => navigateToNamingInstructions('figures')}>
          <NamingImageWrapper
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#1aaba5', '#2e3474']}
          >
            <NamingImage source={astronautImg} />
          </NamingImageWrapper>
          <NamingBottomContainer>
            <NamingTitle>Figuras</NamingTitle>
          </NamingBottomContainer>
        </NamingButton>
      </ScrollView>
    </ImageBackground>
  );
};

export default Dashboard;
