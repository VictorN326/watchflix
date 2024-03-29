import React, { useState, createContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const DarkAndLightMode = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleDarkLightMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  console.log('mode', mode);
  return (
    <ColorModeContext.Provider value={{mode, setMode, toggleDarkLightMode}}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkAndLightMode;