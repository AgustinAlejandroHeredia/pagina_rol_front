import { useEffect, useState } from "react"

// TYPE
import type { MapElem, NewMapElem } from "../types/types"

// Service
import { ViewCampaignService } from "../services/ViewCampaignService"

// MUI
import { Divider, FormControlLabel, Stack, Switch } from "@mui/material"

type ViewMapElemProps = {
    mapElem: MapElem,
    isDungeonMaster: boolean,
}

export const ViewMapElem = ({ 
    mapElem,
    isDungeonMaster,
} : ViewMapElemProps) => {

    // messages
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [sameOptions, setSameOptions] = useState(false)
    const [loading, setLoading] = useState(false)

    // players view edit
    const [originalPlayersView, setOriginalPlayersView] = useState(mapElem.visible)
    const [newPlayersView, setNewPlayersView] = useState(originalPlayersView)

    useEffect(() => {
        setOriginalPlayersView(mapElem.visible)
        setNewPlayersView(mapElem.visible)
        resetMessages()
    }, [mapElem._id])

    const handleSwitchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPlayersView(event.target.checked)
    }

    const resetMessages = () => {
        setError(false)
        setSuccess(false)
        setSameOptions(false)
    }

    const saveChanges = async () => {

        resetMessages()

        if(originalPlayersView === newPlayersView){
            setSameOptions(true)
            return
        }

        try {
            setLoading(true)

            const updateData : NewMapElem = {
                name: mapElem.name,
                description: mapElem.description,
                type: mapElem.type,
                visible: newPlayersView,
                layer: mapElem.layer,
                x: mapElem.x,
                y: mapElem.y,
            }

            await ViewCampaignService.updateMapElem(mapElem._id, updateData)
            setOriginalPlayersView(newPlayersView)
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>

            <Stack spacing={3}>

                {isDungeonMaster && (
                    <>

                    <h4 className="page-message">- DM Options -</h4>

                    <FormControlLabel
                        control={
                        <Switch
                            name="visible"
                            checked={newPlayersView}
                            onChange={handleSwitchChange}
                            sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: 'var(--color-navbar)',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                background: 'var(--color-navbar-plus)',
                            },
                            }}
                        />
                        }
                        label={
                        newPlayersView
                            ? 'Visible for players'
                            : 'Not visible for players'
                        }
                    />

                    {success && (
                        <div className="create-campaign-message-successful">
                            Location updated successfully.
                        </div>
                    )}

                    {error && (
                        <div className="create-campaign-message-unsuccessful">
                            Something went wrong, try again later.
                        </div>
                    )}

                    {sameOptions && (
                        <div className="create-campaign-message-successful">
                            No changes detected.
                        </div>
                    )}

                    <div className={`create-campaign-button ${loading ? 'disabled' : ''}`} onClick={saveChanges}>
                        {loading && <span className="spinner"></span>}
                        {loading ? ' Saving...' : 'Save changes'}
                    </div>

                    <Divider
                        sx={{
                            borderColor: 'var(--color-text)',
                            opacity: 1,
                            my: 0,
                        }}
                    />

                    </>
                )}

                <h4 className="page-message">{mapElem.name}, {mapElem.type}</h4>

                <div className="page-message">{mapElem.description}</div>

            </Stack>
            
        </div>
    )

}