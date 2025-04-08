import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx' // ✅ debe coincidir exactamente con el nombre del archivo


// Punto de entrada principal del frontend
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
