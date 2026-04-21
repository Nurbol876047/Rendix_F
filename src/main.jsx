import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<div style={{ minHeight: '100vh', background: '#050505' }} />}>
    <App />
  </ErrorBoundary>,
)
