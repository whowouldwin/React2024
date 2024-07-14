import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header/Header';
import useSearchQuery from '../hooks/useSearchQuery';

jest.mock('../hooks/useSearchQuery');

const mockedUseSearchQuery = useSearchQuery as jest.MockedFunction<typeof useSearchQuery>;

beforeEach(() => {
  const localStorageMock = (function () {
    let store: { [key: string]: string } = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
      clear() {
        store = {};
      },
      removeItem(key: string) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

describe('Header Component', () => {
  it('calls onSearch when search button is clicked', () => {
    const onSearchMock = jest.fn();
    mockedUseSearchQuery.mockReturnValue({
      query: 'test query',
      setQuery: jest.fn(),
    });

    render(<Header onSearch={onSearchMock} />);

    const buttonElement = screen.getByText('Search');
    fireEvent.click(buttonElement);

    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('updates query state when input changes', () => {
    const setQueryMock = jest.fn();
    mockedUseSearchQuery.mockReturnValue({
      query: '',
      setQuery: setQueryMock,
    });

    render(<Header onSearch={jest.fn()} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new query' } });

    expect(setQueryMock).toHaveBeenCalledWith('new query');
  });
});
