import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import SearchComponent from './components/SearchComponent';

const App = () => {
  return (
    <div className="app">
      <ErrorBoundary>
        <SearchComponent />
      </ErrorBoundary>
    </div>
  );
};

export default App;
