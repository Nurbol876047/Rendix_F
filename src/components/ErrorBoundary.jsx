import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('RENDIX section render error:', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback = null } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
