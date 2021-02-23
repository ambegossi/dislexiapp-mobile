import React, { useCallback } from 'react';
import { ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import dashboardBgImg from '../../assets/images/dashboardBg.png';
import writingImg from '../../assets/images/writing.png';
import astronautImg from '../../assets/images/astronaut.png';

import {
  Container,
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
    <Container>
      <ImageBackground
        source={dashboardBgImg}
        style={{
          flex: 1,
          resizeMode: 'cover',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Header>
          <UserName>{user.name}</UserName>

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

        <Button title="Sair" onPress={signOut} />
      </ImageBackground>
    </Container>
  );
};

export default Dashboard;
