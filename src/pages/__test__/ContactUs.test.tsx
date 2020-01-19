import React from 'react';
import { render } from '../../utils/test-utils';
import ContactUsPage from '../ContactUs';

test('renders learn react link', () => {
  const { getByText } = render(<ContactUsPage />);
});
