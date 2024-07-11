import SearchInput from './SearchInput';

interface HeaderProps {
  onSearch: (query: string) => void;
}
const Header = ({ onSearch }: HeaderProps) => {
    return (
      <header>
        <SearchInput onSearch={onSearch} />
      </header>
    );
}
export default Header;
