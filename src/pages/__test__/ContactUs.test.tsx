import React from 'react';
import { render } from '@testing-library/react';
import ContactUsPage from '../ContactUs';

test('renders learn react link', () => {
  const { getByText } = render(<ContactUsPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
