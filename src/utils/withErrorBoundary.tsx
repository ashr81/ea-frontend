import React, { Component, ComponentType } from 'react';
import SomethingWentWrong from '../pages/error/SomethingWentWrong';

type ErrorInfo = {
  componentStack: string,
};

type State = {
  isError?: boolean,
  info: ErrorInfo | null,
};

type Props = {
  children?: any;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    isError: false,
    info: null
  }

  componentDidCatch(_error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      isError: true,
      info: errorInfo
    })
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    if (isError) {
      return (<SomethingWentWrong />)
    }
    return children;
  }
}


const withErrorBoundary = (
  Component: ComponentType<any>
) => {
  return (props: any) => (
    <ErrorBoundary>
      <Component {...props}/>
    </ErrorBoundary>
  )
}

export default withErrorBoundary;