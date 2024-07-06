import { Component } from 'react';
import { Result } from './interfaces';
import './App.css';

interface State {
  results: Result[];
  error: boolean;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      results: [],
      error: false,
    };
  }

  componentDidMount() {
    this.fetchResults('');
  }

  fetchResults = async (query: string) => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query.trim()}`,
      );
      const data = await response.json();
      const results = data.results.map((item: any) => ({
        name: item.name,
        height: item.height,
      }));
      console.log(results);
      this.setState({ results });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: true });
    }
  };

  handleSearch = (query: string) => {
    this.fetchResults(query);
  };

  handleThrowError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      return <div>Something went wrong!</div>;
    }
    return (
      <div className="app">
        <h1 className="app-header">Star Wars Search</h1>
      </div>
    );
  }
}

export default App;
