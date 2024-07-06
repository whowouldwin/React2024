import { Component } from 'react';
import { Result } from '../../interfaces';

interface ResultItemProps {
    result: Result;
}

class ResultItem extends Component<ResultItemProps> {
    render() {
        const { result } = this.props;
        return (
            <div>
                <h2>{result.name}</h2>
                <p>Height: {result.height}</p>
                <p>{result.description}</p>
            </div>
        );
    }
}

export default ResultItem;