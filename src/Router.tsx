import { Routes, Route } from "react-router-dom"

import { PrivateRoute } from "./components/PrivateRoute";

import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

export function AppRouter() {
  return (
    <Routes>

      {/* rutas publicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* rutas privadas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage/>
          </PrivateRoute>
        }
      />

    </Routes>
  );
}
