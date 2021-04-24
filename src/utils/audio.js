import Sound from 'react-native-sound';

export const playAudio = (audioPath, isMainBundle) => {
  const sound = new Sound(
    audioPath,
    isMainBundle ? Sound.MAIN_BUNDLE : '',
    error => {
      if (error) {
        return null;
      }

      sound.play();

      return null;
    },
  );
};
