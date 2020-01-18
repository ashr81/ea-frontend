import React, { ReactPropTypes, ComponentType } from 'react';
import SomethingWentWrong from '../pages/error/SomethingWentWrong';

/**
 * 
 * @param {any} Component - React component that gets wrapped into a HOC which handles error boundaries.
 * 
 */
const withErrorBoundary = (Component: any) => (
  class extends Component {
    constructor(props: ReactPropTypes) {
      super(props)
      this.state = {
        isError: false,
        errorInfo: null
      }
    }

    componentDidCatch(_error: ErrorConstructor, errorInfo: ErrorEvent) {
      this.setState({
        isError: true,
        errorInfo: errorInfo
      })
    }

    render() {
      const { isError } = this.state;
      if (isError) {
        return (<SomethingWentWrong />)
      }
      return <Component {...this.props}/>
    }
  }
)

export default withErrorBoundary
