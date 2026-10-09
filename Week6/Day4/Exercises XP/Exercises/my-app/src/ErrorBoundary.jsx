import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  componentDidCatch(error) {
    console.error(error)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error has occured.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
