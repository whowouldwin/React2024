import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import Header from './Header/Header';
import Results from './Results/Results';
import DetailComponent from './DetailComponent';
import { useErrorHandling } from '../hooks/useErrorHandling';
import { useFetchResults } from '../hooks/useFetchResults';
import Pagination from './Pagination';

const SearchComponent = () => {
  const { results, loading, fetchResults } = useFetchResults();
  const { error, handleThrowError } = useErrorHandling();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('frontpage');
  const detailsId = queryParams.get('details');

  const currentPage = page ? parseInt(page, 10) : 1;

  const handleSearch = async (query: string) => {
    try {
      await fetchResults(query);
      navigate(`/?frontpage=1`);
    } catch (err) {
      console.error('Error during search:', err);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?frontpage=${newPage}`);
  };

  const handleResultClick = (id: number) => {
    navigate(`/?frontpage=${currentPage}&details=${id}`);
  };

  const handleCloseDetails = () => {
    navigate(`/?frontpage=${currentPage}`);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    fetchResults(savedQuery).then((r) => {
      console.log(r);
    });
  }, [fetchResults]);

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="header-container">
        <h1 className="app-header">Star Wars Search</h1>
        <Header onSearch={handleSearch} />
        <button onClick={handleThrowError}>Throw Error</button>
      </div>
      <div className="content">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="main-container">
            <div className="left-section">
              <Results results={results} onResultClick={handleResultClick} />
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
            {detailsId && (
              <div className="right-section">
                <button onClick={handleCloseDetails}>Close</button>
                <DetailComponent id={detailsId} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
