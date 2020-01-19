import React, { lazy } from 'react';
import withSuspenseLoaderHOC from '../utils/withSuspenseLoaderHOC';
import { Route } from 'react-router-dom';
;

const HomePage = lazy(() => import('../pages/Home'));
const ContactUsPage = lazy(() => import('../pages/ContactUs'));

export const HOME = '/';
export const CONTACT_US = '/contact-us';

export default [
  {path: HOME, component: HomePage, exact: true},
  {path: CONTACT_US, component: ContactUsPage, exact: true}
].map(({component, ...route}) => (
  <Route {...route} component={withSuspenseLoaderHOC(component)} />
))