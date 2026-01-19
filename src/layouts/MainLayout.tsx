import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { CoordinatorProvider } from './Coordinator'

export const MainLayout = () => {
  return (
    <CoordinatorProvider>
      <div className="app-layout">
        <Navbar />

        <main className="content-and-background">
          <Outlet />
        </main>
      </div>
    </CoordinatorProvider>
  )
}
