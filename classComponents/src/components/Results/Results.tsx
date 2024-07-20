import { Result } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../store/selectedItemsSlice';
import type { RootState, AppDispatch } from '../../store/store';
import ResultItem from './ResultItem';
import './Results.css';

interface ResultsProps {
  results: Result[];
  onResultClick: (id: number) => void;
}

const Results = ({ results, onResultClick }: ResultsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

  const handleCheckboxChange = (result: Result, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleItem(result));
  };

  return (
    <div>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul className="results-list">
          {results.map((result, index) => (
            <li
              key={result.name}
              className="result-item"
              onClick={() => onResultClick(index + 1)}
            >
              <ResultItem result={result} />
              <input
                type="checkbox"
                className="result-checkbox"
                checked={selectedItems.some(item => item.name === result.name)}
                onClick={(event) => handleCheckboxChange(result, event)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Results;
