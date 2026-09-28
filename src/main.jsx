import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Portal from './pages/Portal.jsx'
import Checkin from './pages/Checkin.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/portal/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <Portal />
              </ProtectedRoute>
            }
          />
          <Route path="/checkin/:token" element={<Checkin />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
