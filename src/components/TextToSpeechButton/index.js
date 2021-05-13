import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import { useSettings } from '../../hooks/settings';

import { speech } from '../../utils/voice';

const TextToSpeechButton = ({ text }) => {
  const { settings } = useSettings();

  const [loading, setLoading] = useState(false);

  const handleSpeech = async () => {
    setLoading(true);

    try {
      await speech(
        text,
        !!settings && !!settings.speaking_rate ? settings.speaking_rate : 1,
      );
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
