import { useState, type ChangeEvent } from "react";

// MUI
import { Divider, Stack, TextField } from "@mui/material"

//Types
import type { ViewPlayerType } from "../types/types"

//Icons
import { IoMdHelpCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { ViewCampaignService } from "../services/ViewCampaignService";
import { RxExit } from "react-icons/rx";

type ViewPlayersPanelProps = {
    campaign_id: string
    players: ViewPlayerType[]
    isDungeonMaster: boolean
    onSuccess?: () => void
}

export const ViewPlayers = ({
    campaign_id,
    players,
    isDungeonMaster,
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
    const [completeEmail, setCompleteEmail] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [exists, setExists] = useState(false)

    const [loading, setLoading] = useState(false)

    const [kickPlayerError, setKickPlayerError] = useState(false)
    const [kickPlayerSuccess, setKickPlayerSuccess] = useState(false)

    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const sendInvite = async () => {

        // reset
        setCompleteEmail(false)
        setInvalidEmail(false)
        setError(false)
        setSuccess(false)
        setExists(false)

        if(!email.trim()){
            setCompleteEmail(true)
            return
        }

        if (email.length > 254) {
            setCompleteEmail(true)
            return
        }

        if (!emailRegex.test(email)) {
            setInvalidEmail(true)
            return
        }

        try {
            setLoading(true)
            const response = await ViewCampaignService.createInvitation(campaign_id, email)
            if(response.success){
                setSuccess(true)
            }else{
                if(response.message === 'Invitation already exists'){
                    setExists(true)
                }else{
                    setError(true)
                }
            }
        } catch (error) {
            setError(true)
        }finally{
            setLoading(false)
        }
    }

    const kickPlayer = async (alias: string) => {
        
        setKickPlayerError(false)
        setKickPlayerSuccess(false)
        
        try {
            await ViewCampaignService.kickPlayer(campaign_id, alias)
            setKickPlayerSuccess(true)
        } catch (error) {
            setKickPlayerError(true)
        }
    }

    return (

        <div>

            <h4 className="page-message">- Players on this campaign -</h4>

            <Stack spacing={3}>

                {kickPlayerError && (
                    <div className="create-campaign-message-unsuccessful">Error quicking this player, please try again later.</div>
                )}

                {kickPlayerSuccess && (
                    <div className="create-campaign-message-successful">Player quicked.</div>
                )}

                <div className="players-list">
                    {players.length === 0 ? (
                        <h4>No hay usuarios</h4>
                    ) : (
                        <ul>
                            {players.map((player) => (
                                <li 
                                    key={player.alias}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '6px 0',
                                    }}
                                >
                                    <span>
                                        <strong>{player.name}</strong> in the role of{' '}
                                        <em>{player.alias}</em>
                                    </span>

                                    {isDungeonMaster && player.alias != 'Dungeon Master' && (
                                        <RxExit
                                            size={18}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => kickPlayer(player.alias)}
                                        />
                                    )}

                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </Stack>

            {isDungeonMaster && (
            <>

            <Divider
                sx={{
                    borderColor: 'var(--color-text)',
                    opacity: 1,
                    my: 0,
                }}
            />

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
                        <h4 className="page-message">Here u can write down the player's email to send them an invitation that is valid for 12 hours. The'll have to go "Home", "Join new campaign" and enter the code there, and the'll be added automatically to your campaign.</h4>
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

            {completeEmail && (
                <div className="create-campaign-message-unsuccessful">
                    You must complete the email for the invite to be sent.
                </div>
            )}

            {invalidEmail && (
                <div className="create-campaign-message-unsuccessful">
                    Fortmat incorrect. Do not use special characters except for @ y .
                </div>
            )}

            {error && (
                <div className="create-campaign-message-unsuccessful">
                    Something went wrong. Check if the email of that user you want to invite is right.
                </div>
            )}

            {exists && (
                <div className="create-campaign-message-unsuccessful">
                    An invitation for this player alredy exists.
                </div>
            )}

            {success && (
                <div className="create-campaign-message-successful">
                    Invite sent successfuly
                </div>
            )}

            <div className={`create-campaign-button ${loading ? 'disabled' : ''}`} onClick={sendInvite}>
                {loading && <span className="spinner"></span>}
                {loading ? ' Sending...' : 'Send invite'}
            </div>

            </Stack>

            </>
            )}

        </div>
    )

}