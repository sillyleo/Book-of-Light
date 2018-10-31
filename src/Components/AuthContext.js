import React from 'react';

export const AuthContext = React.createContext({user: 'leo'});

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
});
