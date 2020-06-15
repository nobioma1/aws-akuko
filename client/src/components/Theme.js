import React from 'react';
const { ThemeProvider, theme } = require('@chakra-ui/core');

export const customTheme = {
  ...theme,
  fonts: {
    ...theme.fontSizes,
    body: 'Lato, sans-serif',
  },
};

export const Theme = ({ children }) => {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};
