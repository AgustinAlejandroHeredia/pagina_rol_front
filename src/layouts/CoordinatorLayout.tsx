import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CoordinatorProvider } from "./Coordinator";

export function CoordinatorLayout() {
  return (
    <CoordinatorProvider>
      <div className="app-layout">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </CoordinatorProvider>
  );
}
