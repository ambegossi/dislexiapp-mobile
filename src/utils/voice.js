import RNFS from 'react-native-fs';

import { createFile, deleteFile } from './file';
import ttsApi from '../services/ttsApi';
import { playAudio } from './audio';

export const speech = async (text, speakingRate = 1) => {
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
      speakingRate: speakingRate || 1,
    },
  };

  const { data } = await ttsApi.post('', payload);

  await createFile(path, data.audioContent);

  playAudio(path, false);

  await deleteFile(path);
};
