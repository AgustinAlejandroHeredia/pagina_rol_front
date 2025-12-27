// HOOK
import { useViewCampaign } from '../hooks/useViewCampaign'

// NAVIGATION
import { useParams, Link } from 'react-router-dom'

// LOADING ICON
import Loading from '../components/Loading'

// ERROR COMPONENT
import ViewCampaignError from "../components/ViewCampaignError"

// COORDINATOR
import { useCoordinator } from '../layouts/Coordinator'
import { useEffect } from 'react'


export function ViewCampaign() {

    const { campaignId } = useParams<{ campaignId: string }>()

    const { selectedOption, setSelectedOption } = useCoordinator()

    const { campaign, isAuthenticated, loading, error } = useViewCampaign(campaignId ?? '')

    if(!campaignId){
        console.log("No campaign id provided")
        return <ViewCampaignError/>
    }

    useEffect(() => {
        if(isAuthenticated && selectedOption === 'view_compendium' && campaignId) {
            window.open(
                `/view_compendium/${campaignId}`,
                '_blank',
                'noopener,noreferrer',
            )
            setSelectedOption('')
        }
    }, [selectedOption, campaignId, setSelectedOption])

    if(loading) return <Loading />

    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }
    
    return (
        <div className='content-containter'>
            
            

        </div>
    )

}