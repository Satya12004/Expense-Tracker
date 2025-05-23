import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserState from './Context/UserState.jsx'

createRoot(document.getElementById('root')).render(
<UserState>
  <App/>
</UserState>
)
