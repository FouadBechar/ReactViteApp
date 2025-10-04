import React from 'react'
import NavBar from './components/NavBar'
import ContentSections from './components/ContentSections'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path === '/register' || path === '/register.html') {
    return <Register />
  }
  if (path === '/login' || path === '/login.html') {
    return <Login />
  }

  return (
    <div className="app-root">
      <NavBar />
      <main>
        <ContentSections />
      </main>
      <Footer />
    </div>
  )
}
