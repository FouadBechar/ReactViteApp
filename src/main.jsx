import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'
// Import original page styles and scripts extracted from the legacy index.html
import './styles/original.css'
import './original-scripts'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
