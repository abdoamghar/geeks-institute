import { Component } from 'react'
import ErrorBoundary from './ErrorBoundary.jsx'
import Clock from './Clock.jsx'
import './App.css'

class BuggyCounter extends Component {
  state = { counter: 0 }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }))
  }

  render() {
    if (this.state.counter >= 5) {
      throw new Error('I crashed!')
    }

    return (
      <button className="counter" onClick={this.handleClick} type="button">
        {this.state.counter}
      </button>
    )
  }
}

class Child extends Component {
  componentWillUnmount() {
    window.alert('The component named Header is about to be unmounted.')
  }

  render() {
    return <h2>Hello World!</h2>
  }
}

class ModalError extends Component {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('Something went wrong!')
    }

    return null
  }
}

class App extends Component {
  state = {
    favoriteColor: 'red',
    show: true,
    showModalError: false,
  }

  componentDidMount() {
    this.colorTimer = window.setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' })
    }, 3000)
  }

  componentWillUnmount() {
    window.clearTimeout(this.colorTimer)
  }

  shouldComponentUpdate() {
    return true
  }

  getSnapshotBeforeUpdate() {
    console.log('in getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate() {
    console.log('after update')
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' })
  }

  deleteChild = () => {
    this.setState({ show: false })
  }

  showError = () => {
    this.setState({ showModalError: true })
  }

  closeError = () => {
    this.setState({ showModalError: false })
  }

  render() {
    return (
      <main>
        <h1>React Error Boundaries and Lifecycle</h1>

        <Clock />

        <section className="exercise">
          <h2>Exercise XP Gold: Modal Error Handling</h2>
          <button onClick={this.showError} type="button">
            Occur an error
          </button>
          <ErrorBoundary
            key={this.state.showModalError ? 'error' : 'ready'}
            modal
            onClose={this.closeError}
          >
            <ModalError shouldThrow={this.state.showModalError} />
          </ErrorBoundary>
        </section>

        <section className="exercise">
          <h2>Exercise 1: Error Boundary Simulation</h2>
          <p>
            Click a counter to increase it. Each counter crashes when it
            reaches 5.
          </p>

          <div className="simulation">
            <h3>Simulation 1: Two counters in one error boundary</h3>
            <ErrorBoundary>
              <BuggyCounter />
              <BuggyCounter />
            </ErrorBoundary>
          </div>

          <div className="simulation">
            <h3>Simulation 2: Each counter has its own error boundary</h3>
            <p>If one counter crashes, the other one keeps working.</p>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </div>

          <div className="simulation">
            <h3>Simulation 3: Counter without an error boundary</h3>
            <p>
              This counter is not inside a boundary. If it crashes, the page
              will be blank.
            </p>
            <BuggyCounter />
          </div>
        </section>

        <section className="exercise">
          <h2>Exercise 2: Updating Lifecycle</h2>
          <p>
            Favorite color: <strong>{this.state.favoriteColor}</strong>
          </p>
          <button onClick={this.changeColor} type="button">
            Change color to blue
          </button>
          <p>
            The color starts red and changes to yellow after three seconds.
            Check the console for lifecycle messages.
          </p>
        </section>

        <section className="exercise">
          <h2>Exercise 3: Unmounting Lifecycle</h2>
          {this.state.show && <Child />}
          <button onClick={this.deleteChild} type="button">
            Delete
          </button>
        </section>
      </main>
    )
  }
}

export default App
