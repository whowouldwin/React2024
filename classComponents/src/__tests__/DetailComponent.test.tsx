import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailComponent from '../components/Detail/DetailComponent';
import { useGetPersonDetailsQuery } from '../store/apiSlice';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../store/apiSlice', () => ({
  useGetPersonDetailsQuery: jest.fn(),
}));

jest.mock('../utils/errorUtils', () => ({
  getErrorMessage: jest.fn(() => 'Something went wrong'),
}));

describe('DetailComponent', () => {
  it('renders loading state', () => {
    (useGetPersonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <Router>
        <DetailComponent />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetPersonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: {},
      isLoading: false,
    });

    render(
      <Router>
        <DetailComponent />
      </Router>
    );

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('renders no detail available state', () => {
    (useGetPersonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(
      <Router>
        <DetailComponent />
      </Router>
    );

    expect(screen.getByText('No detail available')).toBeInTheDocument();
  });

  it('renders detail data', () => {
    const mockDetail = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    (useGetPersonDetailsQuery as jest.Mock).mockReturnValue({
      data: mockDetail,
      error: null,
      isLoading: false,
    });

    render(
      <Router>
        <DetailComponent />
      </Router>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
    expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
  });
});