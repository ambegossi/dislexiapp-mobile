import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const SettingsContext = createContext({});

const SettingsProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [settings] = await AsyncStorage.multiGet(['@DislexiApp:settings']);

      if (settings[1]) {
        setData({ settings: JSON.parse(settings[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const updateSettings = useCallback(async settings => {
    await AsyncStorage.setItem(
      '@DislexiApp:settings',
      JSON.stringify(settings),
    );

    setData({
      settings,
    });
  }, []);

  const removeSettings = useCallback(async () => {
    await AsyncStorage.removeItem('@DislexiApp:settings');

    setData({});
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings: data.settings,
        updateSettings,
        removeSettings,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SettingsProvider, useSettings };
