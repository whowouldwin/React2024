import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import SearchComponent from './components/SearchComponent';
import NotFound from './components/NotFound';
import DetailComponent from './components/DetailComponent';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<SearchComponent />}>
              <Route path="details/:id" element={<DetailComponent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
};

export default App;