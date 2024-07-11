import {useEffect} from 'react';
import '../App.css';
import Header from './Header/Header';
import Results from './Results/Results';
import {useErrorHandling} from "../hooks/useErrorHandling";
import {useFetchResults} from "../hooks/useFetchResults";


const SearchComponent = () => {
 const {results, loading, fetchResults} = useFetchResults();
 const {error, handleThrowError} = useErrorHandling();


  const handleSearch = async (query: string) => {
    try {
      await fetchResults(query);
    } catch (err) {
      console.error('Error during search:', err);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    fetchResults(savedQuery).then(r => {
      console.log(r);
    } );
  }, [fetchResults]);

  if (error) {
    throw error;
  }

    return (
      <>
        <div className="header-container">
          <h1 className="app-header">Star Wars Search</h1>
          {/*<Header onSearch={this.handleSearch} handleThrowError={this.handleThrowError} />*/}
          <Header onSearch={handleSearch} />
          <button onClick={handleThrowError}>Throw Error</button>
        </div>
        <div className="content">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <Results results={results} />
          )}
        </div>
      </>
    );

};

export default SearchComponent;
