import { Component } from 'react';
import SearchInput from './SearchInput';

interface HeaderProps {
  onSearch: (query: string) => void;
  // handleThrowError: () => void;
}
class Header extends Component<HeaderProps> {
  render() {
    return (
      <header>
        <SearchInput onSearch={this.props.onSearch} />
      </header>
    );
  }
}
export default Header;
