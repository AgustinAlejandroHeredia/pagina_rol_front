// aca va el puente entre la HomePage y el HomeService
import { useEffect, useState } from "react";
import { HomeService } from "../services/HomeService";

import type { CampaignHome } from "../types/types";

import { useAuth0Bridge } from '../auth/auth0-bridge'
import { useAuth0 } from "@auth0/auth0-react";

export function useHome() {

    const [error, setError] = useState<string | null>(null)

    const [campaigns, setCampaigns] = useState<CampaignHome[]>([])

    const [loading, setLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const { isAuthenticated } = useAuth0()
    
    const authBridge = useAuth0Bridge()

    useEffect(() => {
        const loadHome = async () => {
            try {

                const perms = await authBridge.getPermissions()
                if(perms.includes("admin:page")){
                    setIsAdmin(true)
                }

                setLoading(true)

                const campaignsData = await HomeService.getUserCampaigns()
                setCampaigns(campaignsData)

            } catch (err: any) {
                console.error("Error en useHome: ", err)
                setError(err.message || "Error desconocido")
            } finally {
                setLoading(false)
            }
        }
        loadHome()
    }, [isAuthenticated])
    
    return { campaigns, isAuthenticated, isAdmin, loading, error }
}