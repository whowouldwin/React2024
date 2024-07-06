import {Component} from 'react';
import {Result} from '../../interfaces';

interface ResultItemProps {
  result: Result;
}
interface ResultItemState {
  show: boolean;
}

class ResultItem extends Component<ResultItemProps, ResultItemState> {
  constructor(props: ResultItemProps) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 100);
  }

  render() {
    const { result } = this.props;
    const { show } = this.state;

    return (
      <div className={`result-item ${show ? 'show' : ''}`}>
        <h2>{result.name}</h2>
        <p>Height: {result.height}</p>
        <p>{result.description}</p>
      </div>
    );
  }
}

export default ResultItem;