import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Checkin from './pages/Checkin.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/portal/ProtectedRoute.jsx'
import PortalLayout from './components/portal/PortalLayout.jsx'
import SoloRol from './components/portal/SoloRol.jsx'
import Inicio from './pages/portal/Inicio.jsx'
import Agenda from './pages/portal/Agenda.jsx'
import MiAsistencia from './pages/portal/alumno/MiAsistencia.jsx'
import BitacoraAlumno from './pages/portal/alumno/BitacoraAlumno.jsx'
import TomarAsistencia from './pages/portal/profe/TomarAsistencia.jsx'
import Bitacoras from './pages/portal/profe/Bitacoras.jsx'
import Alumnos from './pages/portal/profe/Alumnos.jsx'

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
                <PortalLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Inicio />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="mi-asistencia" element={<SoloRol rol="alumno"><MiAsistencia /></SoloRol>} />
            <Route path="bitacora" element={<SoloRol rol="alumno"><BitacoraAlumno /></SoloRol>} />
            <Route path="asistencia" element={<SoloRol rol="profe"><TomarAsistencia /></SoloRol>} />
            <Route path="bitacoras" element={<SoloRol rol="profe"><Bitacoras /></SoloRol>} />
            <Route path="alumnos" element={<SoloRol rol="profe"><Alumnos /></SoloRol>} />
            <Route path="*" element={<Navigate to="/portal" replace />} />
          </Route>
          <Route path="/checkin/:token" element={<Checkin />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
