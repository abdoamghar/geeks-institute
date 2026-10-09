import React from 'react'
import PostList from './PostList'
import UsersList from './UsersList'
import './App.css'

function App() {
  return (
    <main className="app">
      <UsersList />
      <PostList />
    </main>
  )
}

export default App
