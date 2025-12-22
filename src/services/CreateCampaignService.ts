import { api } from "../api/api";

export const CreateCampaignService = {

    createCampaign: async (name: string, description: string, system: string) => {

        const campaignData = {
            name: name,
            description: description,
            system: system,
        }

        const response = await api.post("/campaigns", campaignData)

        return response.data
    }

}