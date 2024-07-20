import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchResultsExtra, setPage, setQuery } from '../../store/searchSlice';
import Header from '../Header/Header';
import Results from '../Results/Results';
import Pagination from '../Pagination/Pagination';

const resultsPerPage: number = 10;

const SearchComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { results, loading, totalResults, currentPage, query } = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('frontpage') || '1';
  const detailsId = queryParams.get('details');

  useEffect(() => {
    dispatch(setPage(parseInt(page, 10)));
    dispatch(fetchResultsExtra({ query, page: parseInt(page, 10) }));
  }, [dispatch, page, query]);

  const handleSearch = async (searchQuery: string) => {
    dispatch(setQuery(searchQuery));
    dispatch(fetchResultsExtra({ query: searchQuery, page: 1 }));
    navigate('/?frontpage=1');
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(fetchResultsExtra({ query, page: newPage }));
    navigate(`/?frontpage=${newPage}${detailsId ? `&details=${detailsId}` : ''}`);
  };

  const handleResultClick = (id: number) => {
    navigate(`/details/${id}?frontpage=${currentPage}`);
  };

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