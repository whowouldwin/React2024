import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import '../App.css';
import Header from './Header/Header';
import Results from './Results/Results';
import { useErrorHandling } from '../hooks/useErrorHandling';
import { useFetchResults } from '../hooks/useFetchResults';
import Pagination from './Pagination';

const resultsPerPage: number = 10;

const SearchComponent = () => {
  const { results, loading, fetchResults, totalResults } = useFetchResults();
  const { error, handleThrowError } = useErrorHandling();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('frontpage');
  const detailsId = queryParams.get('details');

  const currentPage = page ? parseInt(page, 10) : 1;

  const handleSearch = async (query: string) => {
    try {
      await fetchResults(query, 1);
      navigate(`/?frontpage=1&query=${query}`);
    } catch (err) {
      console.error('Error during search:', err);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?frontpage=${newPage}${detailsId ? `&details=${detailsId}` : ''}`);
  };

  const handleResultClick = (id: number) => {
    navigate(`/details/${id}?frontpage=${currentPage}`);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    fetchResults(savedQuery, currentPage);
  }, [fetchResults, currentPage]);

  if (error) {
    throw error;
  }

  return (
    <div className="content">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="main-container">
          <div className="left-section">
            <div className="header-container">
              <h1 className="app-header">Star Wars Search</h1>
              <Header onSearch={handleSearch} />
              <button onClick={handleThrowError}>Throw Error</button>
            </div>
            <Results results={results} onResultClick={handleResultClick} />
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
            />
          </div>
          <Outlet/>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
