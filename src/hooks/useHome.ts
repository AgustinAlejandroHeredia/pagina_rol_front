// aca va el puente entre la HomePage y el HomeService
import { useEffect, useState } from "react";
import { HomeService } from "../services/HomeService";

export function useHome() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        HomeService.getDatosHome()
            .then(setData)
            .catch((err) => {
                console.error("Error en useHome: ", err)
                setError(err.message || "Error desconocido")
            })
            .finally(() => setLoading(false))
    }, [])
    
    return { data, loading, error }
}