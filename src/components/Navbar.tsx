import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

// LOGO
import logo from '../assets/dice_image_web_icon.png'

// AUTH0
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef, useState } from 'react'

// Personalizacion por rutas
import { useLocation } from 'react-router-dom'

// COORDINATOR
import { useCoordinator } from '../layouts/Coordinator'

export const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const location = useLocation()
  const currentPath = location.pathname

  // COORDINATOR
  const { isLoadingCampaign } = useCoordinator()
  const { isDungeonMaster } = useCoordinator()
  const { setSelectedOption } = useCoordinator()

  useEffect(() => {
    // se define el manejador del evento de tocar fuera del menu (menu que aparece al tocar icono de usuario)
    const handleClickOutside = (e: MouseEvent) => {
      if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    // se asocia el manejador
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  return (
    <nav className="navbar">
      {/* Izquierda */}
      <div className="navbar-left">
        <Link to="/home" className="logo tooltip">
          <img
            src={logo}
            alt="AppLogo"
            className="logo-img"
          />
          <span className="tooltip-text">Quick traveler! Tp to home page</span>
        </Link>
      </div>

      {/* Contenido personalizado segun ruta */}
      <div className="navbar-center">
        
        {/* Contenido para HOME */}
        {currentPath === '/home' && (
          <div className='welcome-text'>Welcome home traveler!</div>
        )}

        {/* Contenido para CREATE */}
        {currentPath === '/create_campaign' && (
          <div className='welcome-text'>Creating campaign...</div>
        )}

        {/* Contenido para VIEW CAMPAIGN */}
        {currentPath.startsWith('/view_campaign') && (
          <div className="navbar-campaign-area">
            {isLoadingCampaign ? (
              <div className="welcome-text">Cargando...</div>
            ) : (
              <div className="campaign-options">

                <button 
                  className="campaign-option-button"
                  onClick={() => setSelectedOption("view_players")}
                >
                  View Players
                </button>

                <button 
                  className="campaign-option-button"
                  onClick={() => setSelectedOption("view_compendium")}
                >
                  Compendium
                </button>

                {isDungeonMaster && (
                  <button 
                    className="campaign-option-button"
                    onClick={() => setSelectedOption("add_location")}
                  >
                    Add Location +
                  </button>
                )}

                {isDungeonMaster && (
                  <button 
                    className="campaign-option-button"
                    onClick={() => setSelectedOption("edit_campaign")}
                  >
                    Edit
                  </button>
                )}

              </div>
            )}
          </div>
        )}

        {/* Contenido para ADMIN */}
        {currentPath === '/admin_options' && (
          <div className='welcome-text'>Welcome admin, time to play god</div>
        )}

      </div>

      {/* Derecha */}
      <div className="navbar-right" ref={menuRef}>

        {isAuthenticated && user && !isLoading && (
          <div className="user-menu">
            <img
              src={user.picture}
              alt={user.name}
              title={user.name}
              className="user-avatar"
              onClick={() => setOpen(!open)}
            />
            <span className="tooltip-text">{user.name}</span>

            {open && (
              <div className="user-card">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-card-avatar"
                />

                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>

                <div className="user-card-actions">
                  <LogoutButton className="btn-outline"/>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
