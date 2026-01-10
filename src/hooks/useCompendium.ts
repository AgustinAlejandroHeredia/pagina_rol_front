import { useState, useEffect } from "react"
import { CompendiumService } from "../services/CompendiumService"

import { useNavigate } from "react-router-dom"

// AUTH0
import { useAuth0 } from "@auth0/auth0-react"
import { useAuth0Bridge } from "../auth/auth0-bridge"

export function useCompendium (campaign_id: string){

    type FileItem = {
        name: string
        fileId: string
    }

    type GroupedFiles = {
        root: FileItem[]
        folders: Record<string, FileItem[]>
    }

    const [reloadTrigger, setReloadTrigger] = useState(0)

    const [error, setError] = useState<string | null>(null)

    const [compendium, setCompendium] = useState<GroupedFiles>({
        root: [],
        folders: {},
    })

    const [loading, setLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const [isDungeonMaster, setIsDungeonMaster] = useState<boolean>(false)

    const { isAuthenticated } = useAuth0()
    
    const authBridge = useAuth0Bridge()



    const resetContent = () => setReloadTrigger(prev => prev +1)

    // ORDER FILES FUNCTION
    const groupFiles = (files: FileItem[]): GroupedFiles => {

        const result: GroupedFiles = {
            root: [],
            folders: {},
        }

        files.forEach(file => {

            // ───────── ROOT FILE ─────────
            if (!file.name.includes('/')) {
                result.root.push(file)
                return
            }

            const [folder, filename] = file.name.split('/', 2)

            // aseguramos carpeta
            if (!result.folders[folder]) {
                result.folders[folder] = []
            }

            // ───────── .keep → solo estructura ─────────
            if (filename === '.keep' || filename === '.bzEmpty') {
            return
            }

            // ───────── archivo real ─────────
            result.folders[folder].push({
                name: filename,
                fileId: file.fileId!,
            })
        })

        return result
    }



    useEffect(() => {
        const loadCompendium = async () => {
            try {

                setLoading(true)
                setError(null)

                const isInCampaign = await CompendiumService.isInCampaign(campaign_id)
                if(!isInCampaign){
                    const navigate = useNavigate()
                    navigate("/")
                }

                const result_dm = await CompendiumService.isDungeonMaster(campaign_id)
                if (result_dm) {
                    setIsDungeonMaster(true)
                }

                if(await authBridge.hasAdminPermission()){
                    setIsDungeonMaster(true)
                }

                const compendiumData = await CompendiumService.getCompendiumFiles(campaign_id)

                // ORDERS COMPENDIUM INFORMATION
                const processedCompendiumData = groupFiles(compendiumData)

                // SavesIt
                setCompendium(processedCompendiumData)

            } catch (error: any) {
                console.error("Error en useCompendium: ", error)
                setError(error.message || "Error desconocido")
            } finally {
                setLoading(false)
            }
        }

        loadCompendium()
    }, [isAuthenticated, reloadTrigger])

    return { compendium, isAuthenticated, isDungeonMaster, loading, error, resetContent }
}