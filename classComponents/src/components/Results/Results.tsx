import { Result } from '../../interfaces';
import ResultItem from './ResultItem';
import './Results.css';

interface ResultsProps {
  results: Result[];
  onResultClick: (id: number) => void;
}

const Results = ({ results, onResultClick }: ResultsProps) => {
  return (
    <ul className="results-list">
      {results.map((result, index) => (
        <ResultItem key={result.name} result={result} onClick={() => onResultClick(index + 1)} />
      ))}
    </ul>
  );
};
export default Results;
