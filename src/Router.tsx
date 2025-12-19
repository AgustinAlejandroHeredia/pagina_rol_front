import { Routes, Route } from "react-router-dom"

import { PrivateRoute } from "./components/PrivateRoute"
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { MainLayout } from "./layouts/MainLayout"

export function AppRouter() {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>

    </Routes>
  )
}
