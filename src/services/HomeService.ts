import { api } from "../api/api"

export const HomeService = {

    getDatosHome: async () => {
        console.log("HACE REQUERIMIENTO")
        const response = await api.get("/prueba_conexion")
        return response.data
    }
}