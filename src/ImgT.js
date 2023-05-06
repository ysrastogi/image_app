import { render, screen } from '@testing-library/react';
import Img from './Img';

test('renders learn react link', () => {
  render(<Img />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
