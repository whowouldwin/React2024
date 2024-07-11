import { Result } from '../../interfaces';
import ResultItem from './ResultItem';

interface ResultsProps {
  results: Result[];
}

const Results = ({ results }: ResultsProps) => {
    return (
      <div className="results">
        {results.map((result) => (
          <ResultItem key={result.name} result={result} />
        ))}
      </div>
    );
}
export default Results;
