import React from 'react'
import NavBar from './components/NavBar'
import ContentSections from './components/ContentSections'
import Footer from './components/Footer'

export default function App() {
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
