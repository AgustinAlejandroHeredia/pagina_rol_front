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
    onSuccessDel?: () => void,
    onSuccessSave?: () => void,
}

export const ViewMapElem = ({ 
    mapElem,
    isDungeonMaster,
    onSuccessDel,
    onSuccessSave,
} : ViewMapElemProps) => {

    const [showOptions, setShowOptions] = useState(true)

    // save messages
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [sameOptions, setSameOptions] = useState(false)
    const [saving, setSaving] = useState(false)

    // delete messages
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [deletingError, setDeletingError] = useState(false)
    const [deletingSuccess, setDeletingSuccess] = useState(false)

    // players view edit
    const [originalPlayersView, setOriginalPlayersView] = useState(mapElem.visible)
    const [newPlayersView, setNewPlayersView] = useState(originalPlayersView)

    useEffect(() => {
        setOriginalPlayersView(mapElem.visible)
        setNewPlayersView(mapElem.visible)

        // resets everything with new element
        resetMessages()
        resetOperationStates()

        setShowOptions(true)
    }, [mapElem._id])

    const handleSwitchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPlayersView(event.target.checked)
    }

    const resetOperationStates = () => {
        setDeleteConfirmation(false)
        setDeleting(false)
        setDeletingError(false)
        setDeletingSuccess(false)

        setError(false)
        setSuccess(false)
        setSaving(false)
    }

    const resetMessages = () => {
        // save
        setError(false)
        setSuccess(false)
        setSameOptions(false)
        // delete
        setDeletingError(false)
        setDeletingSuccess(false)
    }

    const saveChanges = async () => {

        resetMessages()

        if(originalPlayersView === newPlayersView){
            setSameOptions(true)
            return
        }

        try {
            setSaving(true)

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

            onSuccessSave?.()
        } catch (error) {
            setError(true)
        } finally {
            setSaving(false)
        }
    }

    const confirmDelete = () => {
        resetMessages()
        setDeleteConfirmation(true)
    }

    const confirmDeleteOff = () => {
        setDeleteConfirmation(false)
    }

    const deleteMapElem = async () => {

        resetMessages()
        confirmDeleteOff()

        try {
            setDeleting(true)
            await ViewCampaignService.deleteMapElem(mapElem._id)
            setDeletingSuccess(true)
            setShowOptions(false)

            onSuccessDel?.()
        } catch {
            setError(true)
        } finally {
            setDeleting(false)
        }

    }

    const prettyFormat = (value: string) => {
        if(!value) return

        return value
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_-]+/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase())
    }

    return (
        <div>

            <Stack spacing={3}>

                {isDungeonMaster && showOptions && (
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

                    {deleteConfirmation && (
                        <div className="eliminate-campaign-container">
                            <div className="cancel-eliminate-campaign-button" onClick={confirmDeleteOff}>
                                No, cancel operation
                            </div>

                            <div className="eliminate-campaign-button" onClick={deleteMapElem}>
                                Yes, delete location
                            </div>
                        </div>
                    )}

                    {deletingSuccess && (
                        <div className="create-campaign-message-successful">
                            Location deleted successfully.
                        </div>
                    )}

                    {deletingError && (
                        <div className="create-campaign-message-unsuccessful">
                            Something went wrong, try again later.
                        </div>
                    )}

                    {!deleteConfirmation && (
                        <div className="upload-actions">
                            <div className={`create-campaign-button delete-folder-button ${saving ? 'disabled' : ''}`} onClick={saveChanges}>
                                {saving && <span className="spinner"></span>}
                                {saving ? ' Saving...' : 'Save changes'}
                            </div>

                            <div className={`eliminate-campaign-button delete-folder-button ${deleting ? 'disabled' : ''}`} onClick={confirmDelete}>
                                {deleting && <span className="spinner"></span>}
                                {deleting ? ' Deleting...' : 'Delete'}
                            </div>
                        </div>
                    )}

                    </>
                )}

                {!showOptions && (
                    <div className="page-message">
                        This location has alredy been deleted. You can zoom in or out to update the map automatically.
                    </div>
                )}

                <Divider
                    sx={{
                        borderColor: 'var(--color-text)',
                        opacity: 1,
                        my: 0,
                    }}
                />

                <div className="map-elem-card">

                    <h4 className="map-elem-title fantasy">{mapElem.name}, {prettyFormat(mapElem.type)}</h4>

                    <div className="map-elem-description lore">{mapElem.description}</div>

                    <div className="map-elem-meta map-style"> X: {Math.round(mapElem.x)} </div>

                    <div className="map-elem-meta map-style"> Y: {Math.round(mapElem.y)} </div>

                </div>

            </Stack>
            
        </div>
    )

}