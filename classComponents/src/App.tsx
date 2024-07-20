import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchComponent from './components/SearchComponent/SearchComponent';
import NotFound from './components/NotFound/NotFound';
import DetailComponent from './components/Detail/DetailComponent';
import { ThemeProvider } from './context/ThemeContext';
import Flyout from './components/Flyout/Flyout';
import ThemeToggle from './ThemeToggle/ThemeToggle';

const App = () => {
  return (
  <ThemeProvider>
    <BrowserRouter>
      <div className="app">
        <ErrorBoundary>
        <ThemeToggle />
          <Routes>
            <Route path="/" element={<SearchComponent />}>
              <Route path="details/:id" element={<DetailComponent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Flyout />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  </ThemeProvider>
  );
};

export default App;