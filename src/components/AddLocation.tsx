import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { ViewCampaignService } from "../services/ViewCampaignService"

import type { MapCoords } from "./campaign-map/CampaignMap.types"

// Material UI
import { Switch, FormControlLabel, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent, TextField, Stack } from "@mui/material"

type AddLocationPanelProps = {
    campaignId: string
    onSuccess?: () => void
    onChooseLocation: () => void
    coords: MapCoords | null
    choosingLocation: boolean
    cancelChooseLocation: () => void
}

export const AddLocationPanel = ({ campaignId, onSuccess , onChooseLocation, coords, choosingLocation, cancelChooseLocation} : AddLocationPanelProps) => {

    // Messages
    const [showMessageOfEmpty, setShowMessageOfEmpty] = useState(false)
    const [done, setDone] = useState(false)
    const [error, setError] = useState(false)
    const [creating, setCreating] = useState(false)

    // Picture
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [choosingPicture, setChoosingPicture] = useState(false)

    const createLocation = async () => {
        
        if(
            formData.name === '' || 
            formData.description === '' || 
            formData.type === '' || 
            formData.layer === '' ||
            coords === null    
        ){
            setShowMessageOfEmpty(true)
            return
        }

        setCreating(true)

        try{
            setShowMessageOfEmpty(false)
            const payload = {
                ...formData,
                layer: formData.layer,
                x: coords.x,
                y: coords.y,
                file: selectedImage,
            }

            await ViewCampaignService.createMapLocation(campaignId, payload)
            setDone(true)

            onSuccess?.()
        }catch (error) {
            console.log('Error creating new location : ', error)
            setDone(true)
            setError(true)
        } finally {
            setCreating(false)
        }
    }

    type FormData = {
        name: string
        description: string
        type: string
        visible: boolean
        layer: number | ''
    }

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        type: '',
        visible: false,
        layer: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]:
            name === 'layer'
                ? value === '' ? '' : Number(value)
                : value
        }))
    }

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            visible: e.target.checked
        }))
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name as string]: value,
        }))
    }

    const handleSelectPicture = async () => {
        if(fileInputRef.current){
            fileInputRef.current.value=""
        }
        setChoosingPicture(true)
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        setChoosingPicture(false)

        if(!file) return

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
        if(!allowedTypes.includes(file.type)){
            alert("Only png, jpeg and jpg are allowed files.")
            return
        }

        setSelectedImage(file)
    }

    return (
        <div className="add-location-panel">

            <h4 className="page-message">Adding new location</h4>

            <Stack spacing={3}>

                {/* NAME */}
                <TextField
                    fullWidth
                    name="name"
                    label="Name *"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name *"
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

                {/* DESCRIPTION */}
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    name="description"
                    label="Description *"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description *"
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

                {/* LOCATION PICTURE */}
                <div className="upload-actions">
                    <div className="create-campaign-button"
                        onClick={handleSelectPicture}
                    >
                        {choosingPicture && <span className="spinner"></span>}
                        {choosingPicture ? ' Choosing...' : 'Choose Location Picture'}
                    </div>
                </div>

                {/* LOCATION PICTURE NAME */}
                {selectedImage && (
                    <div>
                        Selected img: {selectedImage.name}
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

                {/* LOCATION TYPE */}
                <FormControl fullWidth>
                    <InputLabel
                    id="type-label"
                    sx={{
                        color: formData.type
                        ? 'var(--color-navbar)'
                        : 'var(--color-text)',
                        '&.Mui-focused': {
                        color: 'var(--color-navbar)',
                        },
                    }}
                    >
                    Type *
                    </InputLabel>
                    <Select
                    labelId="type-label"
                    name="type"
                    value={formData.type}
                    label="Type"
                    onChange={handleSelectChange}
                    displayEmpty
                    sx={{
                        color: formData.type
                        ? 'var(--color-navbar-plus)'
                        : 'var(--color-navbar)',

                        '& .MuiSelect-select': {
                            color: 'var(--color-text)',
                        },

                        '& .MuiSelect-icon': {
                        color: formData.type
                            ? 'var(--color-navbar-plus)'
                            : 'var(--color-navbar)',
                        },

                        '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formData.type
                            ? 'var(--color-navbar-plus)'
                            : 'var(--color-navbar)',
                        },

                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--color-navbar-plus)',
                        },

                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--color-navbar-plus)',
                        borderWidth: '2px',
                        },
                        
                    }}
                    >
                    <MenuItem value="capital">Capital</MenuItem>
                    <MenuItem value="city">City</MenuItem>
                    <MenuItem value="continent">Continent</MenuItem>
                    <MenuItem value="location">Location</MenuItem>
                    <MenuItem value="interest_point">Interest Point</MenuItem>
                    <MenuItem value="geography_mark">Geography Mark</MenuItem>
                    <MenuItem value="deity">Deity</MenuItem>
                    <MenuItem value="area">Area</MenuItem>
                    </Select>
                </FormControl>

                {/* VISIBILITY */}
                <FormControlLabel
                    control={
                    <Switch
                        name="visible"
                        checked={formData.visible}
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
                    formData.visible
                        ? 'Visible for players *'
                        : 'Not visible for players *'
                    }
                />

                {/* LAYER */}
                <TextField
                    fullWidth
                    name="layer"
                    label="Layer where is located *"
                    value={formData.layer}
                    onChange={handleChange}
                    placeholder="Layer (number)"
                    variant="outlined"
                    type="number"
                    inputProps={{
                        min: 1,
                        step: 1,
                    }}
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

                {/* LOCATION COORDS */}
                {coords && (
                    <div
                        style={{
                            padding: '8px 12px',
                            border: '1px dashed var(--color-navbar)',
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '0.9rem',
                        }}
                    >
                        <strong>Selected coordinates:</strong>
                        <br />
                            X: {coords.x.toFixed(2)}
                        <br />
                            Y: {coords.y.toFixed(2)}
                    </div>
                )}

                <div className="upload-actions">

                    <div
                        className="create-campaign-button"
                        onClick={onChooseLocation}
                    >
                        {choosingLocation && <span className="spinner"></span>}
                        {choosingLocation ? ' Choosing...' : 'Choose Map Location *'}
                    </div>

                    {choosingLocation && (
                        <div
                            className="eliminate-campaign-button delete-folder-button"
                            onClick={cancelChooseLocation}
                        >
                            {choosingLocation ? 'Cancel' : ''}
                        </div>
                    )}

                </div>

                {/*
                <Divider
                    sx={{
                    borderColor: 'var(--color-text)',
                    opacity: 1,
                    my: 0,
                    }}
                />
                */}

                {showMessageOfEmpty && (
                    <div className="create-campaign-message-unsuccessful">
                        You have to complete all the given fields to procede
                    </div>
                )}

                {done && !error && (
                    <div className="create-campaign-message-successful">
                        New location created successfully!
                    </div>
                )}

                {done && error && (
                    <div className="create-campaign-message-unsuccessful">
                        Sorry, an error has occurred, please try later
                    </div>
                )}

                <div className="create-campaign-button" onClick={createLocation}>
                    {creating && <span className="spinner"></span>}
                    {creating ? 'Adding location...' : 'Add Location +'}
                </div>

            </Stack>
        </div>
    );

}