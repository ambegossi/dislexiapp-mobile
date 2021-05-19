import RNFS from 'react-native-fs';

export const createFile = async (path, data) => {
  return RNFS.writeFile(path, data, 'base64');
};

export const deleteFile = async path => {
  await RNFS.unlink(path);
};
