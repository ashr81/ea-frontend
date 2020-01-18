import React, { Suspense, ReactPropTypes, Component, ComponentType } from 'react';
import { ReactComponentLike } from 'prop-types';

const WithSuspenseHOC = (RouteComponent: React.LazyExoticComponent<React.ComponentType<any>>) => (props: ReactPropTypes) => {
  return (
    <Suspense fallback={<div>loading..,</div>}>
      <RouteComponent {...props}/>
    </Suspense>
  )
}

export default WithSuspenseHOC;