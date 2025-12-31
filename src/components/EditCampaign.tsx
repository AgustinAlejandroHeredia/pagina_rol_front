// Material UI
import { Divider, Stack, TextField } from "@mui/material"
import { useState, type ChangeEvent } from "react"

// Types
import type { UpdateCampaign } from "../types/types"

// Service
import { ViewCampaignService } from "../services/ViewCampaignService"

// Navigation
import { useNavigate } from "react-router-dom"

type EditCampaignPanelProps = {
  campaignId: string
  campaignName: string
  campaignDescription: string
  campaignSystem: string
  onSuccess?: () => void
}

export const EditCampaign = ({ 
    campaignId,
    campaignName,
    campaignDescription,
    campaignSystem,
    onSuccess 
} : EditCampaignPanelProps) => {

    const navigate = useNavigate()

    // Messages update
    const [showMessageOfEmptyUpdate, setShowMessageOfEmptyUpdate] = useState(false)
    const [doneUpdate, setDoneUpdate] = useState(false)
    const [errorUpdate, setErrorUpdate] = useState(false)

    // Messages eliminate
    const [doneEliminate, setDoneEliminate] = useState(false)
    const [errorEliminate, setErrorEliminate] = useState(false)

    // Activate elimination
    const [eliminationOptions, setEliminationOptions] = useState(false)

    const setEliminationOptionsOn = () => {
        setEliminationOptions(true)
    }

    const setEliminationOptionsOff = () => {
        setEliminationOptions(false)
    }

    type FormData = {
        name: string
        description: string
        system: string
    }

    const [formData, setFormData] = useState<FormData>({
        name: campaignName,
        description: campaignDescription,
        system: campaignSystem,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const changeCampaignName = () => {

        if(formData.name === '' || formData.description === '' || formData.description === ''){
            setShowMessageOfEmptyUpdate(true)
            return
        }

        try {
            const updateData: UpdateCampaign = {
                name: formData.name,
                description: formData.description,
                system: formData.system,
            }
            ViewCampaignService.updateCampaign(campaignId, updateData)
            setDoneUpdate(true)
            onSuccess?.()
        } catch (error) {
            console.log('Error editing campaign : ', error)
            setErrorUpdate(true)
        }
    }

    const deleteCampaign = () => {
        try {
            setEliminationOptionsOff
            ViewCampaignService.deleteCampaign(campaignId)
            setDoneEliminate(true)
            onSuccess?.()
            setTimeout(() => {
                navigate("/home") // despues de 5 segundos
            }, 5000)
        } catch (error) {
            console.log('Error eliminating campaign : ', error)
            setErrorEliminate(true)
        }
    }

    return (

        <div>

        <div className="add-location-panel">

            <h4 className="page-message">Editing campaign</h4>

            <Stack spacing={3}>

                <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    variant="outlined"
                    sx={{
                        '& .MuiInputLabel-root': {
                        color: 'var(--color-text)',
                        },
                        '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                        color: 'var(--color-navbar-plus)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                        color: 'var(--color-navbar-plus)',
                        },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--color-navbar)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--color-navbar-plus)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--color-navbar-plus)',
                        },
                        },
                        // Texto que escribe el usuario
                        '& .MuiOutlinedInput-input': {
                        color: 'var(--color-text)',
                        },
                        // Placeholder
                        '& .MuiOutlinedInput-input::placeholder': {
                        color: 'var(--color-navbar)',
                        opacity: 0.8,
                        },
                    }}
                />

                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    variant="outlined"
                    sx={{
                        '& .MuiInputLabel-root': {
                        color: 'var(--color-text)',
                        },
                        '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                        color: 'var(--color-navbar-plus)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                        color: 'var(--color-navbar-plus)',
                        },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--color-navbar)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--color-navbar-plus)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--color-navbar-plus)',
                        },
                        },
                        // Texto que escribe el usuario
                        '& .MuiOutlinedInput-input': {
                        color: 'var(--color-text)',
                        },
                        // Placeholder
                        '& .MuiOutlinedInput-input::placeholder': {
                        color: 'var(--color-navbar)',
                        opacity: 0.8,
                        },
                    }}
                />

                <TextField
                    fullWidth
                    name="system"
                    label="System"
                    value={formData.system}
                    onChange={handleChange}
                    placeholder="System"
                    variant="outlined"
                    sx={{
                        '& .MuiInputLabel-root': {
                        color: 'var(--color-text)',
                        },
                        '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                        color: 'var(--color-navbar-plus)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                        color: 'var(--color-navbar-plus)',
                        },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--color-navbar)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--color-navbar-plus)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--color-navbar-plus)',
                        },
                        },
                        // Texto que escribe el usuario
                        '& .MuiOutlinedInput-input': {
                        color: 'var(--color-text)',
                        },
                        // Placeholder
                        '& .MuiOutlinedInput-input::placeholder': {
                        color: 'var(--color-navbar)',
                        opacity: 0.8,
                        },
                    }}
                />

                {showMessageOfEmptyUpdate && (
                    <div className="create-campaign-message-unsuccessful">
                        You have to complete all the given fields to procede
                    </div>
                )}

                {doneUpdate && !errorUpdate && (
                    <div className="create-campaign-message-successful">
                        Campaign edited successfully!
                    </div>
                )}

                {doneUpdate && errorUpdate && (
                    <div className="create-campaign-message-unsuccessful">
                        Sorry, an error has occurred, please try later
                    </div>
                )}

                <div className="create-campaign-button" onClick={changeCampaignName}>
                    Save
                </div>



                <Divider
                    sx={{
                    borderColor: 'var(--color-text)',
                    opacity: 1,
                    my: 0,
                    }}
                />



                {doneEliminate && !errorEliminate && (
                    <div className="create-campaign-message-successful">
                        Campaign eliminated successfully, redirecting to home in 5 seconds...
                    </div>
                )}

                {doneEliminate && errorEliminate && (
                    <div className="create-campaign-message-unsuccessful">
                        Sorry, an error has occurred, please try later
                    </div>
                )}

                {!eliminationOptions && (
                    <div className="eliminate-campaign-container">
                        <div className="eliminate-campaign-button" onClick={setEliminationOptionsOn}>
                            Eliminate
                        </div>
                    </div>
                )}
                
                {eliminationOptions && (
                    <div className="eliminate-campaign-container">
                        <h4 className="eliminate-campaign-message">
                            You are about to eliminate this campaign, do you want to procede? There is no come back
                        </h4>

                        <div className="cancel-eliminate-campaign-button" onClick={setEliminationOptionsOff}>
                            No, cancel operation
                        </div>

                        <div className="eliminate-campaign-button" onClick={deleteCampaign}>
                            Yes, eliminate campaign
                        </div>

                    </div>
                )}

            </Stack>

        </div>
        
        </div>

    )
}