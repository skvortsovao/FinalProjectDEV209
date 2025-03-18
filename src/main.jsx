import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx' // import App aplication



// It mounts your React app into the root HTML element (<div id="root"></div>)

createRoot(document.getElementById('root')).render(      // implementing app by protect string mode
  <StrictMode>
    <App />
  </StrictMode>,
)
