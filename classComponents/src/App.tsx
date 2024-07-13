import './App.css';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import SearchComponent from './components/SearchComponent';

const App = () => {
  return (
    <div className="app">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchComponent />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;