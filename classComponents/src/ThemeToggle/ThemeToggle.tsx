import {useTheme} from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </div>
  );
};

export default ThemeToggle;