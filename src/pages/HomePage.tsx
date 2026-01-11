// HOOK
import { useHome } from '../hooks/useHome'

// NAVIGATOR
import { useNavigate } from 'react-router-dom'

// LOADING ICON
import Loading from '../components/Loading'

export function HomePage() {

  const navigate = useNavigate()

  const { campaigns, isAuthenticated, isAdmin, loading, error } = useHome() // HOOK

  if (loading) return <Loading />
  
  if (error) return <h1>There was an error... must be the will of god... we sorry</h1>

  const handleJoinCampaign = () => {
    console.log("JOIN CAMPAIGN")
    navigate("/join_campaign")
  }

  const handleCreateCampaign = () => {
    console.log("CREATE CAMPAIGN")
    navigate("/create_campaign")
  }

  const handleOpenCampaign = (campaign_id: string) => {
    console.log("OPEN CAMPAIGN WITH ID ", campaign_id)
    navigate(`/view_campaign/${campaign_id}`)
  }

  const handleAdminOptions = () => {
    console.log("ADMINS OPTIONS")
    navigate("/admin_options")
  }

  return (
    <div className='content-container'>

      <h5 className='page-message'>Here you can access to your campaigns, new ones where que were invited accessing the token on "Join new campaign!", entering the token sent to your email by you Dungeon Master. And if you want to be the Dungeon Master create a campaing yoursel and invite the players using the emails.</h5>

      <div className={`cards-container ${isAuthenticated ? 'two-columns' : 'one-column'}`}>
        {/* visible para todos */}
        <div className="info-card" onClick={handleJoinCampaign}>
          <h4 className='info-simple'>Join new campaign</h4>
        </div>

        <div className="info-card" onClick={handleCreateCampaign}>
          <h4 className='info-simple'>Create new campaign</h4>
        </div>

      </div>

      {isAuthenticated && (
        <div>
          <h5 className="page-sub-message">Your current campaigns:</h5>

          {campaigns.length === 0 ? (
            <h4>No campaigns for now.</h4>
          ) : (
            campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="info-card"
                onClick={() => handleOpenCampaign(campaign._id)}
              >
                <h4>{campaign.campaignName}</h4>

                {campaign.players.map((player, index) => (
                  <div key={`${player.alias}-${index}`}>
                    <h5>
                      - {player.realName} in the role of {player.alias}
                    </h5>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {isAuthenticated && isAdmin && (
        <div>
          <h5 className='page-sub-message'>Only for high level players, the admin options...</h5>
          <div className="info-card" onClick={handleAdminOptions}>
            <h4 className='info-simple'>Let's play god now</h4>
          </div>
        </div>
      )}

    </div>
  )
}
