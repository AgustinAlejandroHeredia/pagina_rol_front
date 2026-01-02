import { api } from "../api/api"

export const CompendiumService = {

    getCompendiumFiles: async (campaignId: string) => {
        const response = await api.get(`/backblaze/compendium/${campaignId}`)
        //console.log("COMPENDIUM CONTENT : ",response.data)
        return response.data
    }
    
}