import posts from './posts.json'

function PostList() {
  return (
    <section className="post-list">
      <h1>Hi This is a Title</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </section>
  )
}

export default PostList
