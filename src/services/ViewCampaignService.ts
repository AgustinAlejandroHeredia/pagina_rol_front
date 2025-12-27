import { api } from "../api/api"

export const ViewCampaignService = {

    getCampaign: async (campaignId: string) => {
        const response = await api.get(`/campaigns/${campaignId}`)
        return response.data
    },

    isDungeonMaster: async (campaignId: string): Promise<boolean> => {
        const response = await api.get<boolean>(`/campaigns/is_dungeon_master/${campaignId}`)
        return response.data
    },

    getUsers: async (campaignId: string) => {
        const response = await api.get(`/campaigns/get_campaign_users/${campaignId}`)
        return response.data
    },

}