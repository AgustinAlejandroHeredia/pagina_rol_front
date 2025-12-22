import { api } from "../api/api"

export const HomeService = {

    getDatosHome: async () => {
        const response = await api.get("/prueba_conexion")
        return response.data
    },

    getUserCampaigns: async () => {
        const response = await api.get("/campaigns/get_user_campaings_home")
        console.log("CAMPAÑAS : ", response.data)
        return response.data
    },
}