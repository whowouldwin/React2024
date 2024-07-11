

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ChildComponents from './components/ChildComponents';

const App = () => {
    return (
      <div className="app">
        <ErrorBoundary>
          <ChildComponents />
        </ErrorBoundary>
      </div>
    );
}

export default App;
