import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

import AuthProvider from './context/AuthProvider.jsx'
import APIProvider from './context/APIProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <APIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </APIProvider>
  </StrictMode>
)
