import React, { useEffect } from 'react';
import { Result } from '../../interfaces';
import './ResultItem.css';

interface ResultItemProps {
  result: Result;
  onClick: () => void;
}

const ResultItem = ({ result, onClick }: ResultItemProps) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`result-item ${show ? 'show' : ''}`} onClick={onClick}>
      <h2>{result.name}</h2>
    </div>
  );
};

export default ResultItem;
