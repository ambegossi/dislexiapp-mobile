import RNFS from 'react-native-fs';

const createFile = async (path, data) => {
  return RNFS.writeFile(path, data, 'base64');
};

export default createFile;
