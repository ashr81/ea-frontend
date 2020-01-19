import React from 'react';
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

interface Props {
  children: React.FC;
}
const AllTheProviders = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }