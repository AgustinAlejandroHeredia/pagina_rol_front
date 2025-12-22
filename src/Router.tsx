import { Routes, Route, Navigate } from "react-router-dom"

import { PrivateRoute } from "./components/PrivateRoute"
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { JoinCampaign } from "./pages/JoinCampaign"
import { OpenCampaign } from "./pages/OpenCampaign"
import { CreateCampaign } from "./pages/CreateCampaign"
import { AdminOptions } from "./pages/AdminOptions"
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

        <Route element={<MainLayout />}>
          <Route path="/join_campaign" element={<JoinCampaign />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/create_campaign" element={<CreateCampaign />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/admin_options" element={< AdminOptions />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/open_campaign/:campaignId" element={<OpenCampaign />} />
        </Route>

      </Route>

      {/* Fallback opcional (con 404) */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}
