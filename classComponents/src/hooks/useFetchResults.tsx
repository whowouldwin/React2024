import { ApiResponse, Person, Result } from '../interfaces';
import { useState, useCallback, useEffect } from 'react';

export const useFetchResults = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);

  const fetchResults = useCallback(async (query: string, page: number = 1): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query.trim()}&page=${page}`,
      );
      const data: ApiResponse = await response.json();
      const fetchedResults = data.results.map((item: Person) => ({
        name: item.name,
        height: item.height,
        description: 'Person',
      }));
      console.log(fetchedResults);
      setResults(fetchedResults);
      setTotalResults(data.count)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    fetchResults(savedQuery).then((r) => {
      console.log(r);
    });
  }, [fetchResults]);

  return { results, loading, fetchResults, totalResults };
};
