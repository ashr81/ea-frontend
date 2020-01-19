import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import routes from './routes/public';
import theme from './theme';
import NotFoundPage from './pages/error/NotFound';
import Layout from './components/organisms/Layout';
import Navbar from './components/organisms/Navbar';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Layout>
        <Switch>
          {routes}
          <Route component={NotFoundPage}/>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
