import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import State from './contexts'
import { AuthState } from './contexts/auth'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthState>
      <App />
    </AuthState>
  // </React.StrictMode>
)
