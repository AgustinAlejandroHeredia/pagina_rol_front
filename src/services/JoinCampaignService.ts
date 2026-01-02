import { api } from "../api/api";

export const JoinCampaignService = {

    joinCampaign: async (token: string, alias: string) => {
        const response = await api.get(`/invite/joinCampaign/${token}/${alias}`)
        return response.data
    }

}