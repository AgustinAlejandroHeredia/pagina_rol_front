import { api } from "../api/api"

export const ViewCampaignService = {

    getCampaign: async (campaignId: string) => {
        const response = await api.get(`/campaigns/${campaignId}`)
        return response.data
    },

    isDungeonMaster: async (): Promise<boolean> => {
        console.log(" service / isDungeonMaster NOT IMPLEMENTED YET , default = false")
        return false
    },

}