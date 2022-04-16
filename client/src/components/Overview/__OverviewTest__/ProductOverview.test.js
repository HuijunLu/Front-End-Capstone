import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOverview from '../../ProductOverview';


it('should render Q&A widget', () => {
  render(<ProductOverview />);
  const inputElement = screen.getByText(/hello/i);
  expect(inputElement).toBeInTheDocument();
})