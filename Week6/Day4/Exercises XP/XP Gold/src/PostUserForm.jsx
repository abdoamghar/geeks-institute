import { Component } from 'react'

class PostUserForm extends Component {
  state = {
    user: '',
    email: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const userData = {
      user: this.state.user,
      email: this.state.email,
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const postedData = await response.json()
      console.log(postedData)
    } catch (error) {
      console.error('Could not post user data:', error)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          User
          <input
            type="text"
            name="user"
            value={this.state.user}
            onChange={this.handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </label>

        <button type="submit">Add user</button>
      </form>
    )
  }
}

export default PostUserForm
