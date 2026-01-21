import { api } from "../api/api"

export const AdminOptionsService = {

    // CAMPAIGNS

    getCampaignsAsAdmin: async () => {
        const response = await api.get("/campaigns/admin/getCampaignsAsAdmin")
        return response.data
    },

    kickPlayerFromCampaignAsAdmin: async (campaignId: string, alias: string) => {
        const response = await api.delete(`/campaigns/admin/kickPlayerAsAdmin/${campaignId}/${alias}`)
        return response.data
    },

    deleteCampaignAsAdmin: async (campaignId: string) => {
        const response = await api.delete(`/campaigns/admin/deleteCampaignAsAdmin/${campaignId}`)
        return response.data
    },
 
    // INVITES

    getInvitesAsAdmin: async () => {
        const response = await api.get("/invite/admin/getInvitesAsAdmin")
        return response.data
    },

    deleteInviteAsAdmin: async (inviteId: string) => {
        const response = await api.delete(`/invite/admin/deleteInviteAsAdmin/${inviteId}`)
        return response.data
    },

    // USERS

    getUsersAsAdmin: async () => {
        const response = await api.get("/users/admin/getUsersAsAdmin")
        return response.data
    },

    deleteUserAsAdmin: async (email: string) => {
        const response = await api.delete(`users/admin/deleteUserAsAdmin/${email}`)
        return response.data
    },

}