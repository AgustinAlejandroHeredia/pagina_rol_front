import { useState, type ChangeEvent } from "react";

// MUI
import { Divider, Stack, TextField } from "@mui/material"

//Types
import type { ViewPlayerType } from "../types/types"

//Icons
import { IoMdHelpCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

type ViewPlayersPanelProps = {
    players: ViewPlayerType[]
    onSuccess?: () => void
}

export const ViewPlayers = ({
    players,
    onSuccess
} : ViewPlayersPanelProps) => {

    const [showHelp, setShowHelp] = useState(false)

    const showHelpOn = () => {
        setShowHelp(true)
    }

    const showHelpOff = () => {
        setShowHelp(false)
    }

    const [email, setEmail] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const sendInvite = () => {
        console.log("SENDING INVITATION NOT IMPLEMENTED YER")
    }

    return (

        <div>

            <h4 className="page-message">- Players on this campaign -</h4>

            <Stack spacing={3}>

                <div className="players-list">
                    {players.length === 0 ? (
                        <h4>No hay usuarios</h4>
                    ) : (
                        <ul>
                            {players.map((player) => (
                                <li key={player.alias}>
                                    <strong>{player.name}</strong> in the role of{' '}
                                    <em>{player.alias}</em>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>



                <Divider
                    sx={{
                        borderColor: 'var(--color-text)',
                        opacity: 1,
                        my: 0,
                    }}
                />

            </Stack>

            {!showHelp && (
                <div className="help-card-icon">
                    <div style={{ cursor: 'pointer' }} onClick={showHelpOn}>
                        <IoMdHelpCircle size={26} />
                    </div>
                </div>
            )}

            {showHelp && (
                <div>

                    <div className="help-card-icon">
                        <div style={{ cursor: 'pointer' }} onClick={showHelpOff}>
                            <IoIosCloseCircle size={26} />
                        </div>
                    </div>

                    <div>
                        <h4 className="page-message">Here u can write down the player's email to send them an invitation that is valid for 24 hours. The'll have to go "Home", "Join new campaign" and enter the code there, and the'll be added automatically to your campaign.</h4>
                    </div>

                </div>
            )}

            <Stack spacing={3}>

            <div>
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
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
            </div>

            <div className="create-campaign-button" onClick={sendInvite}>
                Send invite
            </div>

            </Stack>

        </div>
    )

}