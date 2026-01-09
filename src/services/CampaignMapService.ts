import { api } from "../api/api"

export const CampaignMapService = {

    getMapsElemsByCampaignIdAndLayer: async (campaignId: string, layer: number) => {
        const response = await api.get(
            `/mapelem/getMapsElemsByCampaignIdAndLayer/${campaignId}`, 
            {
                params: {layer}
            }
        )
        
        console.log("SERVICE getMapsElemsByCampaignIdAndLayer : ", response.data)

        return response.data
    }

}