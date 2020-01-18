import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes/public';
import NotFoundPage from './pages/error/NotFound';
import Layout from './components/organisms/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        {routes}
        <Route component={NotFoundPage}/>
      </Switch>
    </Layout>
  );
}

export default App;
