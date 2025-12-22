// aca va el puente entre la HomePage y el HomeService
import { useEffect, useState } from "react";
import { HomeService } from "../services/HomeService";

import type { Campaign } from "../types/campaign";

export function useHome() {

    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [errorCampaigns, setErrorCampaigns] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadHome = async () => {
            try {
                setLoading(true)

                const homeData = await HomeService.getDatosHome()
                setData(homeData)

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
    }, [])
    
    return { data, campaigns, loading, error }
}