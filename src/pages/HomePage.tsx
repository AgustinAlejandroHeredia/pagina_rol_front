import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useHome } from '../hooks/useHome'
import { useAuth0Bridge } from '../auth/auth0-bridge'

export function HomePage() {
  const { isAuthenticated } = useAuth0()
  const { campaigns, loading, error } = useHome() // HOOK

  const [permissions, setPermissions] = useState<string[]>([])

  const authBridge = useAuth0Bridge()

  useEffect(() => {

    let mounted = true

    authBridge.getPermissions().then((perms) => {
      if(mounted){
        setPermissions(perms)
      }
    })

    return () => {
      mounted = false
    }

  }, [isAuthenticated])

  if (loading) return <h1>Loading content...</h1>
  if (error) return <h1>There was an error... must be the will of god... we sorry</h1>
  
  const isAdmin = permissions.includes("admin:page");

  return (
    <div className='content-container'>

      <h5 className='page-message'>Here you can access to your campaigns, new ones where que were invited accessing the token on "Join new campaign!", entering the token sent to your email by you Dungeon Master. And if you want to be the Dungeon Master create a campaing yoursel and invite the players using the emails.</h5>

      <div className={`cards-container ${isAuthenticated ? 'two-columns' : 'one-column'}`}>
        {/* visible para todos */}
        <div className="info-card">
          <h4 className='info-simple'>Join new campaign</h4>
        </div>

        <div className="info-card">
          <h4 className='info-simple'>Create new campaign</h4>
        </div>

      </div>

      {isAuthenticated && (
        <div>
          <h5 className="page-sub-message">Your current campaigns:</h5>

          {campaigns.map((campaign) => (
            <div key={campaign.campaignName} className="info-card">
              <h4>{campaign.campaignName}</h4>

              {campaign.players.map((player, index) => (
                <div key={`${player.alias}-${index}`}>
                  <h5>
                    - {player.realName} in the role of {player.alias}
                  </h5>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {isAuthenticated && isAdmin && (
        <div>
          <h5 className='page-sub-message'>Only for high level players, the admin options...</h5>
          <div className="info-card">
            <h4 className='info-simple'>Let's play god now</h4>
          </div>
        </div>
      )}

    </div>
  )
}
