import { Result } from '../../interfaces';
import './ResultItem.css';

interface ResultItemProps {
  result: Result;
}

const ResultItem = ({ result }: ResultItemProps) => {
  return (
    <div className="result-item-content">
      <h2>{result.name}</h2>
    </div>
  );
};

export default ResultItem;
