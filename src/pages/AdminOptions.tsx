// ICONS
import { MdDeleteOutline } from "react-icons/md"
import { IoMdExit } from "react-icons/io"

import Loading from "../components/Loading"
import { useAdminOptions } from "../hooks/useAdminOptions"

// SERVICE
import { AdminOptionsService } from "../services/AdminOptionsService"

// MUI
import { Divider, FormControlLabel, Stack, Switch } from "@mui/material"
import { useEffect, useState } from "react"

export function AdminOptions() {

    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    
    const { campaigns, invites, users, isAdmin, loading, error, refetch } = useAdminOptions()

    if(loading) return <Loading />

    if (error) return <h1>There was an error... must be the will of god... we sorry</h1>

    const resetMessages = () => {
        setSuccessMessage(false)
        setErrorMessage(false)
    }

    const handleDeleteCampaign = async (campaignId: string, campaignName: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the campaign ${campaignName}?\nThis action cannot be undone.`
        )
        if(confirmed){
            resetMessages()
            try {
                await AdminOptionsService.deleteCampaignAsAdmin(campaignId)
                await refetch()
                setSuccessMessage(true)
            } catch (error) {
                setErrorMessage(true)
            }
        }
    }

    const handleKickUser = async (userId: string, userEmail: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to kick the user ${userEmail}?\nThis action cannot be undone.`
        )
        if(confirmed){
            resetMessages()
            try {
                await AdminOptionsService.kickPlayerFromCampaignAsAdmin(userId, userEmail)
                await refetch()
                setSuccessMessage(true)
            } catch (error) {
                setErrorMessage(true)
            }
        }
    }

    const handleDeleteInvite = async (inviteId: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete this invite?\nThis action cannot be undone.`
        )
        if(confirmed){
            resetMessages()
            try {
                await AdminOptionsService.deleteInviteAsAdmin(inviteId)
                await refetch()
                setSuccessMessage(true)
            } catch (error) {
                setErrorMessage(true)
            }
        }
    }

    const handleDeleteUser = async (userId: string, userEmail: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the user ${userEmail} from the platform?\nThis action cannot be undone.`
        )
        if(confirmed){
            resetMessages()
            try {
                await AdminOptionsService.deleteUserAsAdmin(userId)
                await refetch()
                setSuccessMessage(true)
            } catch (error) {
                setErrorMessage(true)
            }
        }
    }

    return (
        <div className="content-container">
            {isAdmin ? (

                <Stack spacing={5}>

                    <div>
                    
                        {/* CAMPAIGNS */}

                        <h2 className="page-sub-message">Campaigns:</h2>
                        {campaigns.length === 0 ? (
                            <h4 className="page-sub-message">No campaigns registered.</h4>
                        ) : (
                            campaigns.map((campaign) => (
                                <div
                                    key={campaign._id} 
                                    className="info-card"
                                >

                                    <div className="file-row-admin">
                                        <MdDeleteOutline
                                            className="file-delete-small"
                                            title="Delete campaign"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteCampaign(campaign._id, campaign.name)
                                            }}
                                        />
                                    </div>

                                    <h3>{campaign.name}</h3>
                                    <p>ID: {campaign._id}</p>
                                    <p className="break-text">{campaign.description}</p>

                                    <h4>System:</h4>
                                    <p>{campaign.system}</p>

                                    <h4>DM:</h4>
                                    <p>- {campaign.dungeonMaster.alias}, {campaign.dungeonMaster.email}</p>
                                    
                                    <h4>Users:</h4>
                                    {campaign.users.map((user) => (
                                        <div 
                                            key={user.alias}
                                            className="campaign-user-admin-row"
                                        >
                                            <span>- {user.alias}, {user.email}</span>
                                            <IoMdExit
                                                className="file-delete-small"
                                                title="Quick player from campaign"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleKickUser(campaign._id, campaign.name)
                                                }}
                                            />
                                        </div>
                                    ))}

                                </div>
                            ))
                        )}

                    </div>

                    {/* INVITES */}

                    <div>

                        <h2 className="page-sub-message">Invites:</h2>
                        {invites.length === 0 ? (
                            <h4 className="page-sub-message">No invites registered.</h4>
                        ) : (
                            invites.map((invite) => (
                                <div
                                    key={invite._id} 
                                    className="info-card"
                                >

                                    <div className="file-row-admin">
                                        <MdDeleteOutline
                                            className="file-delete-small top-right-icon"
                                            title="Delete invite"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteInvite(invite._id)
                                            }}
                                        />
                                    </div>

                                    <p>Campaign ID: {invite.campaign_id}</p>
                                    <p>Expires at: {invite.expires_at.toString()}</p>
                                    {new Date(invite.expires_at).getTime() < Date.now()
                                        ? <p className="create-campaign-message-unsuccessful">Expired invitation</p>
                                        : <p className="create-campaign-message-successful">Valid invitation</p>
                                    }
                                    <p>Token: {invite.token}</p>
                                </div>
                            ))
                        )}

                    </div>

                    {/* USERS */}

                    <div>

                        <h2 className="page-sub-message">Users:</h2>
                        {users.length === 0 ? (
                            <h4 className="page-sub-message">No users registered.</h4>
                        ) : (
                            users.map((user) => (
                                <div 
                                    key={user.email}
                                    className="info-card"
                                >

                                    <div className="file-row-admin">
                                        <IoMdExit
                                            className="file-delete-small top-right-icon"
                                            title="Quick user from system"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteUser(user._id, user.email)
                                            }}
                                        />
                                    </div>

                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                            ))
                        )}

                    </div>

                </Stack>

            ) : (
                <h1>You are not an admin, get out of here!</h1>
            )}
        </div>
    )

}