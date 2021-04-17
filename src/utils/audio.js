import Sound from 'react-native-sound';

export const playAudio = audioPath => {
  const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
    if (error) {
      return null;
    }

    sound.play();

    return null;
  });
};
