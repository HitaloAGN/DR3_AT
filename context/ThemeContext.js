import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    dark: darkMode,
    colors: {
      background: darkMode ? '#121212' : '#f5f5f5',
      card: darkMode ? '#1e1e1e' : '#ffffff',
      text: darkMode ? '#ffffff' : '#000000',
      subtext: darkMode ? '#aaaaaa' : '#666666',
      border: darkMode ? '#333333' : '#eeeeee',
      primary: '#FF6347',
      inputBorder: darkMode ? '#444444' : '#dddddd',
      inputText: darkMode ? '#ffffff' : '#333333',
      inputBg: darkMode ? '#2a2a2a' : '#ffffff',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}