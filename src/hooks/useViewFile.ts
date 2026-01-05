import { useEffect, useState } from "react";

// SERVICE
import { ViewFileService } from "../services/ViewFileService";

export function useViewFile(fileId: string) {

    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!fileId) return;

        const loadFile = async () => {
            
            setLoading(true);
            setError(null);

            try {

                const response = await ViewFileService.getFileById(fileId)

                const blob = new Blob([response.data], { type: response.headers['content-type'] })
                const url = URL.createObjectURL(blob)

                setFileUrl(url)

            } catch (error) {
                setError("Error loading file")
            } finally {
                setLoading(false)
            }

        }

        loadFile()

        return () => {
            if (fileUrl) URL.revokeObjectURL(fileUrl)
        }

    }, [fileId])

    return { fileUrl, loading, error }

}