import {Component} from 'react';
import {Result} from './interfaces';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ChildComponents from "./components/ChildComponents";

interface State {
  results: Result[];
  loading: boolean;
  error: boolean;
  showResults: boolean;
}

class App extends Component<object, State> {

  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <ChildComponents />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
