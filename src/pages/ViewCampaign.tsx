import { useEffect, useRef, useState } from 'react'

// HOOK
import { useViewCampaign } from '../hooks/useViewCampaign'

// NAVIGATION
import { useNavigate, useParams } from 'react-router-dom'

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
import { ViewPlayers } from '../components/ViewPlayers'
import { ViewCampaignService } from '../services/ViewCampaignService'



export function ViewCampaign() {

    const navigate = useNavigate()

    const { campaignId } = useParams<{ campaignId: string }>()

    if(campaignId === undefined){
        console.log("No campaign id provided")
        return <ViewCampaignError/>
    }

    const { selectedOption, setSelectedOption } = useCoordinator()
    const { isDungeonMaster } = useCoordinator()

    // SIDECARD
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const openPanel = () => setIsPanelOpen(true)
    const closePanel = () => {
        setIsPanelOpen(false),
        setSelectedOption('')
    }

    const hasOpenedRef = useRef(false)

    // MAP UPLOAD
    const [showUploadOption, setShowUploadOption] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedMap, setSelectedMap] = useState<File | null>(null)
    const [uploadingMap, setUploadingMap] = useState(false)
    const [uploadingMapSuccess, setUploadingMapSuccess] = useState(false)
    const [uploadingMapError, setUploadingMapError] = useState(false)

    const [mapUrl, setMapUrl] = useState<string | null>(null)

    const { campaign, map, view_users_data, isAuthenticated, loading, error } = useViewCampaign(campaignId)

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

    }, [campaign, selectedOption, campaignId, isAuthenticated, setSelectedOption])

    useEffect(() => {
        if (!map) {
            setShowUploadOption(true)
            setMapUrl(null)
            return
        }

        setShowUploadOption(false)

        const url = URL.createObjectURL(map)
        setMapUrl(url)

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [map])

    if(loading) return <Loading />

    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }

    const handleUploadMap = () => {
        fileInputRef.current?.click()
    }

    const handleSelectMap = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const file = event.target.files?.[0]

            if(!file) return

            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
            if (!allowedTypes.includes(file.type)) {
                setUploadingMapError(true)
                event.target.value = ''
                return
            }

            setUploadingMap(true)
            setUploadingMapSuccess(false)
            setUploadingMapError(false)

            try {

                const formData = new FormData()
                formData.append('map', file)

                await ViewCampaignService.uploadMap(campaignId, formData)

                setSelectedMap(file)
                setShowUploadOption(false)

            } catch {
                setUploadingMapError(true)
            } finally {
                setUploadingMap(false)
                setSelectedMap(null)
                if(fileInputRef.current) { 
                    fileInputRef.current.value = ''
                }
            }
        }
    }
    
    return (
        <div>
            
            {showUploadOption && (
                <div className="content-container">
                    <h5 className="page-message">
                        Welcome traveler, for now there is no map loded for you to use it. 
                    </h5>


                    {uploadingMapSuccess && (
                        <div className='create-campaign-message-successful'>
                            Map uploaded successfully.
                        </div>
                    )}

                    {uploadingMapError && (
                        <div className='create-campaign-message-unsuccessful'>
                            Something went wrong, please try later.
                        </div>
                    )}


                    <div 
                        className={`create-campaign-button centered-wide ${uploadingMap ? 'disabled' : ''}`}
                        onClick={() => handleUploadMap()}
                    >
                        {uploadingMap && <span className="spinner"></span>}
                        {uploadingMap ? ' Uploading...' : 'Upload Map'}
                    </div>
                </div>
            )}

            {!showUploadOption && (
                <div className="campaign-map-container">
                    {mapUrl && (
                        <img
                            src={mapUrl}
                            alt="Campaign Map"
                            className="campaign-map-image"
                        />
                    )}
                </div>
            )}

            <SideCard isOpen={isPanelOpen} onClose={closePanel}>

                {isAuthenticated && selectedOption === 'view_players' && campaignId && (
                    <ViewPlayers campaign_id={campaignId} players={view_users_data}/>
                )}

                {isAuthenticated && selectedOption === 'add_location' && campaignId && (
                    <AddLocationPanel campaignId={campaignId}/>
                )}

                {isAuthenticated && selectedOption === 'edit_campaign' && campaignId && (
                    <EditCampaign campaignId={campaignId} campaignName={campaign!.name} campaignDescription={campaign!.description} campaignSystem={campaign!.system}/>
                )} 

            </SideCard>

            {/* Invisible input for file uploading */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleSelectMap}
                style={{ display: "none" }}
                accept="
                    image/png,
                    image/jpeg,
                    image/jpg,
                "
            />

        </div>
    )

}