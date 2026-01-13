import { api } from "../api/api"

export const CompendiumService = {

    isInCampaign: async (campaignId: string) => {
        const response = await api.get<boolean>(`/campaigns/isInCampaign/${campaignId}`)
        return response.data
    },

    isDungeonMaster: async (campaignId: string): Promise<boolean> => {
        const response = await api.get<boolean>(`/campaigns/is_dungeon_master/${campaignId}`)
        return response.data
    },

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

    createFolder: async (campaignId: string, folderName: string) => {
        const response = await api.post("/backblaze/createFolder", {
            campaignId,
            folderName,
        })
        return response.data
    },

    deleteFolder: async (campaignId: string, folderName: string) => {
        const response = await api.delete(`/backblaze/deleteFolder/${campaignId}/${folderName}`)
        return response.data
    },

    changeViewSetting: async (fileId: string, visibility: boolean) => {
        console.log("CURRENT VISIBILITY IS : ",{visibility})
        const response = await api.patch(
            `/filemongoreg/${fileId}`, 
            { visibility }
        )
        return response.data
    },

}