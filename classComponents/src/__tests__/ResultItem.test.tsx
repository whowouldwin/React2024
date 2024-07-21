import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultItem from '../components/Results/ResultItem';
import {Result} from '../interfaces';

describe('ResultItem', () => {
  const mockResult: Result = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male'
  };

  it('renders result name correctly', () => {
    render(<ResultItem result={mockResult} />);
    const resultNameElement = screen.getByText(/Luke Skywalker/i);
    expect(resultNameElement).toBeInTheDocument();
  });
});
