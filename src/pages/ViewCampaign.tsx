import { useEffect, useRef, useState } from 'react'

// HOOK
import { useViewCampaign } from '../hooks/useViewCampaign'

// NAVIGATION
import { useParams } from 'react-router-dom'

// LOADING ICON
import Loading from '../components/Loading'

// ERROR COMPONENT
import ViewCampaignError from "../components/ViewCampaignError"

// COORDINATOR
import { useCoordinator } from '../layouts/Coordinator'

// SIDECARD
import { SideCard } from '../components/SideCard'
import { AddLocationPanel } from '../components/AddLocation'
import { EditCampaign } from '../components/EditCampaign'



export function ViewCampaign() {

    const { campaignId } = useParams<{ campaignId: string }>()

    const { selectedOption, setSelectedOption } = useCoordinator()

    // SIDECARD
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const openPanel = () => setIsPanelOpen(true)
    const closePanel = () => {
        setIsPanelOpen(false),
        setSelectedOption('')
    }

    const hasOpenedRef = useRef(false)

    const { campaign, view_users_data, isAuthenticated, loading, error } = useViewCampaign(campaignId ?? '')

    if(!campaignId){
        console.log("No campaign id provided")
        return <ViewCampaignError/>
    }

    useEffect(() => {

        // COMPENDIUM
        if(isAuthenticated && selectedOption === 'view_compendium' && campaignId) {
            window.open(
                `/view_compendium/${campaignId}`,
                '_blank',
                'noopener,noreferrer',
            )
            setSelectedOption('')
        }

        // VIEW PLAYERS --> OVERLAY
        if(isAuthenticated && selectedOption === 'view_players' && !hasOpenedRef.current) {
            console.log("LLEGA A VIEW PLAYERS")
            openPanel()
        }

        // ADD LOCATION
        if(isAuthenticated && selectedOption === 'add_location' && !hasOpenedRef.current) {
            console.log("LLEGA A ADD LOCATION")
            openPanel()
        }

        // EDIT CAMPAIGN
        if(isAuthenticated && selectedOption === 'edit_campaign' && !hasOpenedRef.current) {
            console.log("LLEGA A EDIT CAMPAIGN")
            openPanel()
        }

        if (selectedOption === '') {
            hasOpenedRef.current = false;
        }

    }, [selectedOption, campaignId, isAuthenticated, setSelectedOption])

    if(loading) return <Loading />

    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }
    
    return (
        <div>
            
            <h1> CAMPAIGN MAP </h1>

            <SideCard isOpen={isPanelOpen} onClose={closePanel}>

                {isAuthenticated && selectedOption === 'view_players' && campaignId && (
                    <div className="players-list">
                        {view_users_data.length === 0 ? (
                        <p>No hay usuarios</p>
                        ) : (
                        <ul>
                            {view_users_data.map((player) => (
                            <li key={player.alias}>
                                <strong>{player.name}</strong> in the role of{' '}
                                <em>{player.alias}</em>
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                )}

                {isAuthenticated && selectedOption === 'add_location' && campaignId && (
                    <AddLocationPanel campaignId={campaignId}/>
                )}

                {isAuthenticated && selectedOption === 'edit_campaign' && campaignId && (
                    <EditCampaign campaignId={campaignId} campaignName={campaign!.name} campaignDescription={campaign!.description} campaignSystem={campaign!.system}/>
                )} 

            </SideCard>

        </div>
    )

}