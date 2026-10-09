import { Component } from 'react'
import axios from 'axios'

class PostPostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      title: '',
      body: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const postData = {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body,
    }

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        postData,
      )

      console.log(response.data)
    } catch (error) {
      console.error('Could not post data:', error)
    }
  }

  render() {
    const { userId, title, body } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="userId"
          name="userId"
          value={userId}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="body"
          name="body"
          value={body}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default PostPostForm
