import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import PropTypes from 'prop-types';

import createFile from '../../utils/createFile';
import ttsApi from '../../services/ttsApi';
import { playAudio } from '../../utils/audio';

const TextToSpeechButton = ({ text }) => {
  const [loading, setLoading] = useState(false);

  const handleSpeech = async () => {
    setLoading(true);

    try {
      const path = `${RNFS.DocumentDirectoryPath}/voice.mp3`;

      const payload = {
        input: {
          text,
        },
        voice: {
          languageCode: 'pt-br',
          name: 'pt-BR-Standard-A',
          ssmlGender: 'FEMALE',
        },
        audioConfig: {
          audioEncoding: 'MP3',
        },
      };

      const { data } = await ttsApi.post('', payload);

      await createFile(path, data.audioContent);
      playAudio(path, false);
    } catch (err) {
      console.error('tts error', err);
    }

    setLoading(false);
  };
  return loading ? (
    <ActivityIndicator color="#fff" size="small" />
  ) : (
    <TouchableOpacity onPress={handleSpeech}>
      <Icon name="volume-2" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

TextToSpeechButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextToSpeechButton;
