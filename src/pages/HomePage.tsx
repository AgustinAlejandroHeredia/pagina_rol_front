import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useHome } from '../hooks/useHome'
import { useAuth0Bridge } from '../auth/auth0-bridge'

export function HomePage() {
  const { isAuthenticated } = useAuth0()
  const { data, loading, error } = useHome()

  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading_perms, setLoadingPerms] = useState(true);

  const authBridge = useAuth0Bridge()

  useEffect(() => {
    /*
    const checkRole = async () => {
      const admin_rol_page = await hasRole('Admin rol page')
      setIsAdmin(admin_rol_page)
    }

    if (isAuthenticated) {
      checkRole()
    }
    */

    let mounted = true

    authBridge.getPermissions().then((perms) => {
      if(mounted){
        setPermissions(perms)
        setLoadingPerms(false)
      }
    })

    return () => {
      mounted = false
    }

  }, [isAuthenticated])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar datos</p>
  
  const isAdmin = permissions.includes("admin:page");

  return (
    <div className='content-container'>

      <h5 className='page-message'>Here you can access to your campaigns, new ones where que were invited accessing the token on "Join new campaign!", entering the token sent to your email by you Dungeon Master. And if you want to be the Dungeon Master create a campaing yoursel and invite the players using the emails.</h5>

      <div className={`cards-container ${isAuthenticated ? 'two-columns' : 'one-column'}`}>
        {/* visible para todos */}
        <div className="info-card">
          <h4>Unirse a una campaña</h4>
        </div>

        <div className="info-card">
          <h4>Crear nueva campaña</h4>
        </div>

      </div>

      {isAuthenticated && isAdmin && (
        <div>
          <h5 className='page-message'>Solo para nivel elevado, opciones de administrador...</h5>
          <div className="info-card">
            <h4>Ir a opciones de administrador</h4>
          </div>
        </div>
      )}

    </div>
  )
}
