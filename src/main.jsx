import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { ApiProvider } from './contexts/ApiContext'
import GoogleAnalytics from './components/GoogleAnalytics'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleAnalytics />
    <ThemeProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ThemeProvider>
  </StrictMode>,
)
