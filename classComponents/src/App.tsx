import { Component } from 'react';
import { Result, ApiResponse, Person } from './interfaces';
import './App.css';
import Header from './components/Header/Header';
import Results from './components/Results/Results';



interface State {
  results: Result[];
  error: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      error: false,
    };
  }

  async componentDidMount() {
    await this.fetchResults('');
  }

  fetchResults = async (query: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query.trim()}`,
      );
      const data: ApiResponse = await response.json();
      const results = data.results.map((item: Person) => ({
        name: item.name,
        height: item.height,
        description: "Person"
      }));
      console.log(results);
      this.setState({ results });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: true });
    }
  };

  handleSearch = async (query: string) => {
    await this.fetchResults(query);
  };

  // handleThrowError = () => {
  //   this.setState({ error: true });
  // };

  render() {
    if (this.state.error) {
      return <div>Something went wrong!</div>;
    }
    return (
      <div className="app">
        <h1 className="app-header">Star Wars Search</h1>
        {/*<Header onSearch={this.handleSearch} handleThrowError={this.handleThrowError} />*/}
        <Header onSearch={this.handleSearch} />
        <Results results={this.state.results} />
      </div>

    );
  }
}

export default App;
