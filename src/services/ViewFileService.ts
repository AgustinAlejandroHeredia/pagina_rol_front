import { api } from "../api/api"

export const ViewFileService = {

    getFileById: async (fileId: string) => {
        const response = await api.get(`/backblaze/getFileById/${fileId}`, {responseType: 'blob'})
        return response
    },

}