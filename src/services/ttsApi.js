import axios from 'axios';
import Config from 'react-native-config';

const ttsApi = axios.create({
  baseURL: Config.GOOGLE_TTS_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    key: Config.GOOGLE_TTS_KEY_ANDROID,
  },
});

export default ttsApi;
