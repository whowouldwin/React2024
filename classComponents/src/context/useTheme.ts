import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import {Theme} from './constants';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};