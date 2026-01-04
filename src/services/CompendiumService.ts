import { api } from "../api/api"

export const CompendiumService = {

    getCompendiumFiles: async (campaignId: string) => {
        const response = await api.get(`/backblaze/compendium/${campaignId}`)
        //console.log("COMPENDIUM CONTENT : ",response.data)
        return response.data
    },

    uploadFiles: async (campaignId: string, formData: FormData) => {
        const response = await api.post(`/backblaze/uploadFile/${campaignId}`, formData)
        return response.data
    },
    
    deleteFile: async (fileId: string) => {
        const response = await api.delete(`/backblaze/deleteFile/${fileId}`)
        return response.data
    },

}