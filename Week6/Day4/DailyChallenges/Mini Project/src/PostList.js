import React from 'react'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      errorMsg: '',
    }
  }

  componentDidMount() {
    fetch(POSTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((posts) => {
        this.setState({ posts })
      })
      .catch((error) => {
        console.error('Unable to load posts:', error)
        this.setState({ errorMsg: 'Unable to load posts.' })
      })
  }

  render() {
    const { posts, errorMsg } = this.state

    return (
      <section className="list-section">
        <h1>List of posts:</h1>
        {errorMsg && <p role="alert">{errorMsg}</p>}
        {posts.length > 0 && (
          <ul className="post-list">
            {posts.map((post) => (
              <li className="post" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }
}

export default PostList
