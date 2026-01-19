import { useEffect, useState } from "react";

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
    const [campaigns, setCampaigns] = useState<Campaign | null>(null)
    const [invites, setInvites] = useState<Invite | null>(null)
    const [users, setUsers] = useState<User | null>(null)

    const authBridge = useAuth0Bridge()

    useEffect(() => {
        const loadAdminOptions = async () => {

            setLoading(true)

            try {

                const permissions = await authBridge.hasAdminPermission()
                setIsAdmin(permissions)

                const campaigns = await AdminOptionsService.getCampaignsAsAdmin()
                setCampaigns(campaigns)
                console.log("CAMPAIGNS : ")
                console.log(campaigns)

                const invites = await AdminOptionsService.getInvitesAsAdmin()
                setInvites(invites)
                console.log("INVITES : ")
                console.log(invites)

                const users = await AdminOptionsService.getUsersAsAdmin()
                setUsers(users)
                console.log("USERS : ")
                console.log(users)

            } catch (error: any) {
                console.error("Error en useAdminOptions: ", error)
                setError(error.message || "Error desconocido")
            } finally {
                setLoading(false)
            }
        }
        loadAdminOptions()
    }, [])

    return { campaigns, invites, users, isAdmin, loading, error }

}