import { Routes, Route, Navigate } from "react-router-dom"

import { PrivateRoute } from "./components/PrivateRoute"
import { LoginPage } from "./pages/LoginPage"
import { PostLoginCheck } from "./pages/PostLoginCheck"
import { HomePage } from "./pages/HomePage"
import { JoinCampaign } from "./pages/JoinCampaign"
import { ViewCampaign } from "./pages/ViewCampaign"
import { CreateCampaign } from "./pages/CreateCampaign"
import { AdminOptions } from "./pages/AdminOptions"
import { MainLayout } from "./layouts/MainLayout"
import { CoordinatorLayout } from "./layouts/CoordinatorLayout"
import { CompendiumPage } from "./pages/Compendium"

// VIEW FILES
import { ViewImage } from "./pages/ViewFiles/ViewImage"
import { ViewPdf } from "./pages/ViewFiles/ViewPdf"
import { ViewText } from "./pages/ViewFiles/ViewText"

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
          <Route path="/post_login_check" element={<PostLoginCheck />}/>
        </Route>

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

        <Route element={<CoordinatorLayout />}>
          <Route path="/view_campaign/:campaignId" element={<ViewCampaign />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/view_compendium/:campaignId" element={<CompendiumPage/>}/>
        </Route>

        {/* VIEW FILES */}

        <Route element={<MainLayout />}>
          <Route path="/view/images/:fileId" element={<ViewImage/>}/>
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/view/pdf/:fileId" element={<ViewPdf/>}/>
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/view/text/:fileId" element={<ViewText/>}/>
        </Route>

      </Route>

      {/* Fallback opcional (con 404) */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}
