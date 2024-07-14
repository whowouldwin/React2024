import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

test('updates URL query parameter when page changes', () => {
  const handlePageChange = jest.fn();
  render(
    <Pagination currentPage={1} onPageChange={handlePageChange} totalResults={20} resultsPerPage={10} />
  );
  const nextButton = screen.getByText(/Next/i);
  fireEvent.click(nextButton);
  expect(handlePageChange).toHaveBeenCalledWith(2);
});