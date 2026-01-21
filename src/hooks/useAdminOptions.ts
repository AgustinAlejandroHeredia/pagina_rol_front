import { useCallback, useEffect, useState } from "react";

import { useAuth0Bridge } from '../auth/auth0-bridge'
import { useAuth0 } from "@auth0/auth0-react";

import { AdminOptionsService } from "../services/AdminOptionsService";

// TYPEs
import type { Campaign } from "../types/types";
import type { Invite } from "../types/types";
import type { User } from "../types/types";

export function useAdminOptions() {

    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // INFO
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [invites, setInvites] = useState<Invite[]>([])
    const [users, setUsers] = useState<User[]>([])

    const { hasAdminPermission } = useAuth0Bridge()

    const loadAdminOptions = async () => {
        setLoading(true)
        setError(null)
        try {

            const permissions = await hasAdminPermission()
            setIsAdmin(permissions)

            if(!permissions){
                setCampaigns([])
                setInvites([])
                setUsers([])
                return
            }

            const campaigns = await AdminOptionsService.getCampaignsAsAdmin()
            setCampaigns(campaigns)
            //console.log("CAMPAIGNS : ", campaigns)

            const invites = await AdminOptionsService.getInvitesAsAdmin()
            setInvites(invites)
            //console.log("INVITES : ", invites)

            const users = await AdminOptionsService.getUsersAsAdmin()
            setUsers(users)
            //console.log("USERS : ", users)

        } catch (error: any) {
            console.error("Error en useAdminOptions: ", error)
            setError(error.message || "Error desconocido")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAdminOptions()
    }, [])

    return { campaigns, invites, users, isAdmin, loading, error, refetch: loadAdminOptions }

}