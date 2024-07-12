import { Result } from '../../interfaces';
import ResultItem from './ResultItem';

interface ResultsProps {
  results: Result[];
  onResultClick: (id: number) => void;
}

const Results = ({ results, onResultClick }: ResultsProps) => {
  return (
    <div className="results">
      {results.map((result, index) => (
        <ResultItem key={result.name} result={result} onClick={() => onResultClick(index + 1)} />
      ))}
    </div>
  );
};
export default Results;
