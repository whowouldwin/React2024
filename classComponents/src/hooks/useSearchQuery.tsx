import { useState, useEffect } from 'react';

const useSearchQuery = () => {
  const [query, setQuery] = useState(() => localStorage.getItem('searchQuery') || '');

  useEffect(() => {
    return () => {
      localStorage.setItem('searchQuery', query);
    };
  }, [query]);

  return { query, setQuery };
};

export default useSearchQuery;