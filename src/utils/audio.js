import Sound from 'react-native-sound';

export const playAudio = (audioPath, isMainBundle) => {
  const sound = new Sound(
    audioPath,
    isMainBundle ? Sound.MAIN_BUNDLE : '',
    error => {
      if (error) {
        return;
      }

      sound.play(() => {
        sound.release();
      });
    },
  );
};
