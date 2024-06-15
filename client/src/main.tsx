import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import LogCheck from '../ContextLog'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <LogCheck>
  <BrowserRouter>
   <React.StrictMode>
    <App />
   </React.StrictMode>
  </BrowserRouter>
 </LogCheck>,
)
