import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFF8F0',
            color: '#4A4A4A',
            borderRadius: '12px',
            border: '1px solid #F8E8EE',
            fontFamily: 'Quicksand, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#A8D8B8',
              secondary: '#FFF8F0',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
