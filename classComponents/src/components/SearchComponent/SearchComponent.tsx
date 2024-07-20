import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useSearchPeopleQuery } from '../../store/apiSlice';
import '../../App.css';
import Header from '../Header/Header';
import Results from '../Results/Results';
import Pagination from '../Pagination/Pagination';
import { getErrorMessage } from '../../utils/errorUtils';

const resultsPerPage: number = 10;

const SearchComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('frontpage') || '1';
  const detailsId = queryParams.get('details');
  const query = queryParams.get('query') || '';

  const { data, error, isLoading } = useSearchPeopleQuery({ query, page: parseInt(page, 10) });

  const handleSearch = (searchQuery: string) => {
    navigate(`/?query=${searchQuery}&frontpage=1`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?query=${query}&frontpage=${newPage}${detailsId ? `&details=${detailsId}` : ''}`);
  };

  const handleResultClick = (id: number) => {
    navigate(`/details/${id}?query=${query}&frontpage=${page}`);
  };

  return (
    <div className="content">
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <div>Error: {getErrorMessage(error)}</div>
      ) : (
        <div className="main-container">
          <div className="left-section">
            <div className="header-container">
              <h1 className="app-header">Star Wars Search</h1>
              <Header onSearch={handleSearch} />
            </div>
            <Results results={data?.results || []} onResultClick={handleResultClick} />
            <Pagination
              currentPage={parseInt(page, 10)}
              onPageChange={handlePageChange}
              totalResults={data?.count || 0}
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