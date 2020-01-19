import React from 'react';
import { render } from './utils/test-utils';
import App from './App';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const navbarBreadcrumbHomeText = getByTestId('breadcrumb-home-path');
  expect(navbarBreadcrumbHomeText).toBeInTheDocument();
});
