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



export function ViewCampaign() {

    const { campaignId } = useParams<{ campaignId: string }>()

    const { selectedOption, setSelectedOption } = useCoordinator()

    // SIDECARD
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const openPanel = () => setIsPanelOpen(true)
    const closePanel = () => setIsPanelOpen(false)

    const hasOpenedRef = useRef(false)

    const { campaign, isAuthenticated, loading, error } = useViewCampaign(campaignId ?? '')

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
            setSelectedOption('')
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
        <div className='content-container'>
            
            <h1> GENERAL CONTENT </h1>

            <SideCard isOpen={isPanelOpen} onClose={closePanel}>
                <div> 
                    GENERAL CONTENT 
                </div>
            </SideCard>

        </div>
    )

}