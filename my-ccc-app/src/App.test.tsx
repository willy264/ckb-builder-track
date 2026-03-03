import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test("renders docs link", () => {
  render(<App />);
  const linkElement = screen.getByText(/read ccc docs/i);
  expect(linkElement).toBeTruthy();
});
