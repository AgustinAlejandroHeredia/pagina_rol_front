import { useEffect, useState } from "react";

import { ViewCampaignService } from "../services/ViewCampaignService";

import { useCoordinator } from "../layouts/Coordinator";

// AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import type { Campaign } from "../types/types";
import { useAuth0Bridge } from "../auth/auth0-bridge";

export function useViewCampaign(campaign_id: string) {

    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)

    const [campaign, setCampaign] = useState<Campaign | null>(null)

    type Player = {
        name:string
        alias:string
    }

    const [view_users_data, setViewUsersData] = useState<Player[]>([])

    // AUTH0
    const { isAuthenticated, isLoading: authLoading } = useAuth0()
    const authBridge = useAuth0Bridge()

    // COORDINATOR
    const { setIsLoadingCampaign } = useCoordinator()
    const { setIsDungeonMaster } = useCoordinator()

    useEffect(() => {
        if(!isAuthenticated || authLoading) return

        const loadViewCampaign = async () => {

            setIsLoadingCampaign(true)
            setIsDungeonMaster(false)

            try {

                const result_dm = await ViewCampaignService.isDungeonMaster(campaign_id)
                if (result_dm) {
                    setIsDungeonMaster(true)
                }

                const perms = await authBridge.getPermissions()
                if(perms.includes("admin:page")){
                    setIsDungeonMaster(true)
                }

                const campaign = await ViewCampaignService.getCampaign(campaign_id)
                setCampaign(campaign)

                const usersData = await ViewCampaignService.getUsers(campaign_id)
                setViewUsersData(usersData)

            } catch (err: any) {
                console.log("Error en useViewCampaign: ", err)
                setError(err.message || "Error desconocido")
            } finally {
                setLoading(false)
                setIsLoadingCampaign(false)
            }
        }
        loadViewCampaign()
    },[isAuthenticated])

    return { campaign, view_users_data, isAuthenticated, loading, error }

}