import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
