import { Component } from 'react'
import Modal from './Modal.jsx'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error, errorInfo) {
    console.error(error)
    this.setState({ error, errorInfo })
    this.occurError()
  }

  occurError = () => {
    this.setState({ hasError: true })
  }

  closeError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    this.props.onClose?.()
  }

  render() {
    if (this.state.hasError && this.props.modal) {
      return (
        <Modal
          errorInfo={this.state.errorInfo}
          message={this.state.error?.toString() ?? 'Error: Something went wrong!'}
          onClose={this.closeError}
        />
      )
    }

    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h3>Something went wrong.</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }

    if (this.state.error) {
      return null
    }

    return this.props.children
  }
}

export default ErrorBoundary
