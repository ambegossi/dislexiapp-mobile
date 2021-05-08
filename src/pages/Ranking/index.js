import React, { useCallback, useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import TextToSpeechButton from '../../components/TextToSpeechButton';

import api from '../../services/api';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { speech } from '../../utils/voice';

import bgImg from '../../assets/images/bg.png';
import avatarDefaultImg from '../../assets/images/avatarDefault.png';
import trophyImg from '../../assets/images/trophy.png';
import shieldImg from '../../assets/images/shield.png';

import {
  Container,
  Header,
  FirstUserContainer,
  FirstUserAvatarContainer,
  FirstUserNameContainer,
  UserAvatar,
  FirstUserName,
  RankingList,
  RankingRowContainer,
  RankingUserPositionContainer,
  RankingUserPosition,
  RankingUserName,
  ShieldImage,
  ShieldLevelContainer,
  ShieldLevel,
} from './styles';

const Ranking = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setUsers([]);
      setLoading(true);

      const loadRanking = async () => {
        try {
          const { data } = await api.get('/ranking', {
            params: { number: 15 },
          });

          setUsers(data);
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            'Ocorreu um erro ao carregar o ranking, tente novamente.';

          await speech(errorMessage);

          Alert.alert('Ops...', errorMessage);
        }

        setLoading(false);
      };

      loadRanking();
    }, []),
  );

  return (
    <Container source={bgImg}>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left-circle" size={32} color="#fff" />
        </TouchableOpacity>

        <TextToSpeechButton
          text={
            users.length > 0
              ? `Parabéns ${users[0].name}, você está em primeiro lugar.`
              : ''
          }
        />
      </Header>

      {!!loading && <ActivityIndicator color="#fff" size="large" />}
      {!loading && users.length > 0 && (
        <>
          <RankingList
            data={users.slice(1)}
            keyExtractor={user => user.id}
            ListHeaderComponent={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <FirstUserContainer>
                <FirstUserAvatarContainer>
                  <Image source={trophyImg} />
                  <UserAvatar
                    source={
                      users[0].profile.avatar
                        ? {
                            uri: users[0].profile.avatar.image_url,
                          }
                        : avatarDefaultImg
                    }
                  />
                </FirstUserAvatarContainer>
                <FirstUserNameContainer>
                  <FirstUserName>
                    1º {capitalizeFirstLetter(users[0].name)}
                  </FirstUserName>
                  <ShieldImage source={shieldImg} size={30}>
                    <ShieldLevelContainer>
                      <ShieldLevel>{users[0].profile.level}</ShieldLevel>
                    </ShieldLevelContainer>
                  </ShieldImage>
                </FirstUserNameContainer>
              </FirstUserContainer>
            }
            renderItem={({ item: user, index }) => (
              <RankingRowContainer>
                <RankingUserPositionContainer>
                  <RankingUserPosition>{index + 2}º</RankingUserPosition>
                  <RankingUserName>
                    {capitalizeFirstLetter(user.name)}
                  </RankingUserName>
                </RankingUserPositionContainer>

                <ShieldImage source={shieldImg} size={25}>
                  <ShieldLevelContainer>
                    <ShieldLevel>{user.profile.level}</ShieldLevel>
                  </ShieldLevelContainer>
                </ShieldImage>
              </RankingRowContainer>
            )}
          />
        </>
      )}
    </Container>
  );
};

export default Ranking;
