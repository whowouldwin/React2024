import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import SearchComponent from './components/SearchComponent';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<SearchComponent/>}/>
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
};

export default App;