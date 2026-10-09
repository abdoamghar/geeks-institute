import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorBoundary from './ErrorBoundary.jsx'
import PostList from './PostList.jsx'
import Example1 from './Example1.jsx'
import Example2 from './Example2.jsx'
import Example3 from './Example3.jsx'
import './App.css'

function HomeScreen() {
  return <h1>Home</h1>
}

function ProfileScreen() {
  return <h1>Profile Screen</h1>
}

function ShopScreen() {
  throw new Error('Shop is not available')
}

function PostDataScreen() {
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function postData() {
    setError('')
    setIsSending(true)

    try {
      const response = await fetch(
        'https://webhook.site/8c1d2089-7dd1-4661-8def-281f59f2523f',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key1: 'myusername',
            email: 'mymail@gmail.com',
            name: 'Isaac',
            lastname: 'Doe',
            age: 27,
          }),
        },
      )

      console.log(response)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
    } catch (requestError) {
      console.error('Unable to post data:', requestError)
      setError('The request failed. Check the browser console and webhook CORS settings.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="post-data">
      <button className="btn btn-primary" onClick={postData} disabled={isSending}>
        {isSending ? 'Sending...' : 'Press me to post some data'}
      </button>
      {error && <p role="alert">{error}</p>}
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <main className="exercise-card">
        <nav className="navbar justify-content-center">
          <div className="nav nav-pills">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/profile">
              Profile
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/shop">
              Shop
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/posts">
              Posts
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/data">
              Data
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/post-data">
              Post Data
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
          <Route path="/posts" element={<PostList />} />
          <Route
            path="/data"
            element={
              <div className="data-examples">
                <Example1 />
                <Example2 />
                <Example3 />
              </div>
            }
          />
          <Route path="/post-data" element={<PostDataScreen />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
