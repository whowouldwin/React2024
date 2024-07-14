import { render, screen, fireEvent } from '@testing-library/react';
import ResultItem from '../components/Results/ResultItem';
import {Result} from '../interfaces';

const mockResult: Result = { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male' };

test('renders the relevant card data', () => {
  render(<ResultItem result={mockResult} onClick={jest.fn()} />);
  const cardTitle = screen.getByText(mockResult.name);
  expect(cardTitle).toBeInTheDocument();
});

test('clicking on a card opens a detailed card component', () => {
  const handleClick = jest.fn();
  render(<ResultItem result={mockResult} onClick={handleClick} />);
  const card = screen.getByText(mockResult.name);
  fireEvent.click(card);
  expect(handleClick).toHaveBeenCalled();
});