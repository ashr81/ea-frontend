import React, { ReactHTMLElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, withRouter } from 'react-router-dom';
import theme from '../theme';


const customRender = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </ThemeProvider>)
}

export * from '@testing-library/react';

export { customRender as render };