import React from 'react'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

class UsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoaded: false,
    }
    this.errorMsg = ''
  }

  componentDidMount() {
    fetch(USERS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((users) => {
        this.setState({ users, isLoaded: true })
      })
      .catch((error) => {
        console.error('Unable to load users:', error)
        this.errorMsg = 'Unable to load users.'
        this.setState({ isLoaded: true })
      })
  }

  render() {
    const { users, isLoaded } = this.state

    if (!isLoaded) {
      return <div>Loading...</div>
    }

    if (this.errorMsg) {
      return <p role="alert">{this.errorMsg}</p>
    }

    return (
      <section className="list-section">
        <h1>List of users:</h1>
        <ul className="user-list">
          {users.map((user) => (
            <li className="user" key={user.id}>
              <strong>Name:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

export default UsersList
