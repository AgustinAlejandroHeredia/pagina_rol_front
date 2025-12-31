import { api } from "../api/api"
import type { MapElem, UpdateCampaign } from "../types/types"

export const ViewCampaignService = {

    getCampaign: async (campaignId: string) => {
        const response = await api.get(`/campaigns/${campaignId}`)
        return response.data
    },

    updateCampaign: async (campaignId: string, updateData: UpdateCampaign) => {
        const response = await api.patch(`/campaigns/${campaignId}`, updateData)
        return response.data
    },

    deleteCampaign: async (campaignId: string) => {
        const response = await api.delete(`/campaigns/${campaignId}`)
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

    createMapLocation: async (campaignId: string, formData: MapElem) => {
        const response = await api.post(
            `/mapelem/${campaignId}`, 
            formData
        )
        return response.data
    }

}