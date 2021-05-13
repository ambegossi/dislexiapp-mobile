import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './auth';
import { SettingsProvider } from './settings';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <SettingsProvider>{children}</SettingsProvider>
  </AuthProvider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
