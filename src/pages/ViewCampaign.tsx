// HOOK
import { useViewCampaign } from '../hooks/useViewCampaign'

// NAVIGATION
import { useParams } from 'react-router-dom'

// LOADING ICON
import Loading from '../components/Loading'

// ERROR COMPONENT
import ViewCampaignError from "../components/ViewCampaignError"


export function ViewCampaign() {

    const { campaignId } = useParams<{ campaignId: string }>()

    if(!campaignId){
        console.log("No campaign id provided")
        return <ViewCampaignError/>
    }

    const { campaign, isAuthenticated, loading, error } = useViewCampaign(campaignId)

    if(loading) return <Loading />

    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }

    console.log(isAuthenticated, loading, error)
    
    return (
        <div className='content-containter'>
            
        </div>
    )

}