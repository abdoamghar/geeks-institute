import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-card" role="alert">
          <h3>Something went wrong.</h3>
          <p>{this.state.error?.message}</p>
          {this.state.errorInfo && (
            <details>
              <summary>Show error details</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
          <button
            className="button button-blue"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
