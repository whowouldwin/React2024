import { Component } from 'react';
import { Result } from '../../interfaces';
import ResultItem from './ResultItem';

interface ResultsProps {
  results: Result[];
}

class Results extends Component<ResultsProps> {
  render() {
    return (
      <div className="results">
        {this.props.results.map((result) => (
          <ResultItem key={result.name} result={result} />
        ))}
      </div>
    );
  }
}

export default Results;
