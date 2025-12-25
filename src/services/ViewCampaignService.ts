import { api } from "../api/api"

export const ViewCampaignService = {

    getCampaign: async (campaignId: string) => {
        const response = await api.get(`/campaigns/${campaignId}`)
        return response.data
    }

}