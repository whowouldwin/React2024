import {ChangeEvent, useState} from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {

  const savedQuery = localStorage.getItem('searchQuery') || '';
  const [query, setQuery] = useState(savedQuery);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem('searchQuery', query);
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );

};

export default SearchInput;
