import { api } from "../api/api"

export const AdminOptionsService = {

    getCampaignsAsAdmin: async () => {
        const response = await api.get("/campaigns/admin/getCampaignsAsAdmin")
        return response.data
    },

    getInvitesAsAdmin: async () => {
        const response = await api.get("/invite/admin/getInvitesAsAdmin")
        return response.data
    },

    getUsersAsAdmin: async () => {
        const response = await api.get("/users/admin/getUsersAsAdmin")
        return response.data
    },

}