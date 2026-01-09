import { api } from "../api/api"
import type { MapElem, UpdateCampaign } from "../types/types"

type InvitePayload = {
    campaign_id: string
    email: string
}

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

    isInCampaign: async (campaignId: string) => {
        const response = await api.get<boolean>(`/campaigns/isInCampaign/${campaignId}`)
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
    },

    createInvitation: async (campaignId: string, email: string) => {
        const inviteData: InvitePayload = {
            campaign_id: campaignId,
            email: email,
        }
        const response = await api.post(
            '/invite/',
            inviteData,
        )
        return response.data
    },

    uploadMap: async (campaignId: string, formData: FormData) => {
        const response = await api.post<string>(`/backblaze/uploadCampaignMap/${campaignId}`, formData)
        return response.data
    },

    getMap: async (fileId: string) => {
        const response = await api.get(
            `/backblaze/getFileById/${fileId}`,
            {
                responseType: 'blob',
            }
        )
        return response.data
    },

    getMapsElems: async (campaignId: string) => {
        const response = await api.get<[]>(`/mapelem/getMapElems/${campaignId}`)
        return response.data
    }

}