import React, { useCallback } from 'react';
import { ImageBackground, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import dashboardBgImg from '../../assets/images/dashboardBg.png';
import writingImg from '../../assets/images/writing.png';
import astronautImg from '../../assets/images/astronaut.png';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

import {
  Header,
  UserName,
  ProfileButton,
  UserAvatar,
  NamingButton,
  NamingImageWrapper,
  NamingImage,
  NamingBottomContainer,
  NamingTitle,
} from './styles';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

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
        contentContainerStyle={{ flex: 1 }}
      >
        <Header>
          <UserName>{capitalizeFirstLetter(user.name)}</UserName>

          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar
              source={{
                uri:
                  'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
              }}
            />
          </ProfileButton>
        </Header>

        <NamingButton>
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

        <NamingButton>
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

        <Button onPress={signOut} title="sair" />
      </ScrollView>
    </ImageBackground>
  );
};

export default Dashboard;
