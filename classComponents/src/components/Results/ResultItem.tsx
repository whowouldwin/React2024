import React, { useEffect } from 'react';
import { Result } from '../../interfaces';

interface ResultItemProps {
  result: Result;
}

const ResultItem = ({ result }: ResultItemProps) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <div className={`result-item ${show ? 'show' : ''}`}>
      <h2>{result.name}</h2>
      <p>Height: {result.height}</p>
      <p>{result.description}</p>
    </div>
  );
};

export default ResultItem;
