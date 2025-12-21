import { Routes, Route, Navigate } from "react-router-dom"

import { PrivateRoute } from "./components/PrivateRoute"
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { MainLayout } from "./layouts/MainLayout"

export function AppRouter() {
  return (
    <Routes>

      {/* Redirect raiz */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas publicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Route>

      {/* Fallback opcional (con 404) */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}
