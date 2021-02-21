import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './auth';

const AppProvider = ({ children }) => <AuthProvider>{children}</AuthProvider>;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
