import { api } from "../api/api";

export const PostLoginCheckService = {

    checkUser: async (name: string, email: string) => {
        const response = await api.post("/users/userExists", {name, email})
        return response.data
    }

}