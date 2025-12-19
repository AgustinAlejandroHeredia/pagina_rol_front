import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

export const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Izquierda */}
      <div className="navbar-left">
        <Link to="/home" className="logo">
          MiApp
        </Link>
      </div>

      {/* Centro */}
      <div className="navbar-center">
        <p>Cosas</p>
      </div>

      {/* Derecha */}
      <div className="navbar-right">
        <LogoutButton/>
      </div>
    </nav>
  )
}
