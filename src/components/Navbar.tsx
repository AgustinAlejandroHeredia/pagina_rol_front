import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

// LOGO
import logo from '../assets/dice_image_web_icon.png'
import default_user_picture from '../assets/default_user_picture.png'

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
              <div className="welcome-text">Loading...</div>
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

        {/* Contenido para VIEW COMPENDIUM */}
        {currentPath.startsWith('/view_compendium') && (
          <div className='welcome-text'>Compendium</div>
        )}

        {/* Contenido para JOIN CAMPAIGN */}
        {currentPath.startsWith('/join_campaign') && (
          <div className='welcome-text'>Joining campaign...</div>
        )}

        {/* VIEW IMAGES */}
        {currentPath.startsWith('/view/images') && (
          <div className='welcome-text'>Viewing Image</div>
        )}

        {/* VIEW TEXT */}
        {currentPath.startsWith('/view/text') && (
          <div className='welcome-text'>Viewing Text</div>
        )}

        {/* VIEW PDF */}
        {currentPath.startsWith('/view/pdf') && (
          <div className='welcome-text'>Viewing PDF</div>
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
            
            {!isLoading ? (
              <>
                <img
                  src={user.picture}
                  alt={user.name}
                  title={user.name}
                  className="user-avatar"
                  onClick={() => setOpen(!open)}
                />
                <span className="tooltip-text">{user.name}</span>
              </>
            ) : (
              <>
                <img
                  src={default_user_picture}
                  alt={"default_user"}
                  title={"default_user"}
                  className="user-avatar"
                  onClick={() => setOpen(!open)}
                />
                <span className="tooltip-text">Loading {user.name} profile picture...</span>
              </>
            )}

            {open && (
              <div className="user-card">

                {!isLoading ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="user-card-avatar"
                  />
                ) : (
                  <img
                    src={default_user_picture}
                    alt={"default_user"}
                    className="user-card-avatar"
                  />
                )}

                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>

                <div className="user-card-actions">
                  <LogoutButton className="btn-outline danger"/>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
