import { useEffect, useRef, useState } from "react"
import { useCompendium } from "../hooks/useCompendium";
import ViewCampaignError from "../components/ViewCampaignError";
import Loading from "../components/Loading";

// NAVIGATION
import { useNavigate, useParams } from "react-router-dom";

// ICONS
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CompendiumService } from "../services/CompendiumService";

export function CompendiumPage() {

    const navigate = useNavigate()

    const { campaignId } = useParams<{ campaignId: string }>()

    if(campaignId === undefined){
        console.log("No campaign id provided")
        return <ViewCampaignError/>
    }

    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({})

    // FILES
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)
    const [targetFoler, setTargetFolder] = useState<string>('root')
    const [uploadingFile, setUploadingFile] = useState(false)
    const [succesfulUpload, setSuccessfulUpload] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    const { compendium, isAuthenticated, isAdmin, loading, error, resetContent } = useCompendium(campaignId)

    if(loading) return <Loading />
    
    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }

    const toggleFolder = (folderName: string) => {
        setOpenFolders(prev => ({
            ...prev,
            [folderName]: !prev[folderName],
        }))
    }
    const handleSelectFile = (fileId: string) => {
        console.log("SE SELECCIONA LA ID ", fileId)
    }

    const handleDeleteFile = (fileId: string) => {
        console.log("Eliminar archivo con ID:", fileId)
    }

    // opens file dialog
    const handleUploadFile = (folderName?: string) => {
        const folder = folderName || 'root'
        setTargetFolder(folder)
        fileInputRef.current?.click()
    }

    // user selects file/s
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const filesArray = Array.from(event.target.files)
            setSelectedFiles(filesArray)

            if(filesArray.length === 0) return

            setUploadingFile(true)
            try {

                const formData = new FormData()
                filesArray.forEach(file => formData.append('files', file))
                formData.append('folder', targetFoler)

                await CompendiumService.uploadFiles(campaignId, formData)

                setSuccessfulUpload(true)

                resetContent()

            } catch (error) {
                setUploadError(true)
            } finally {
                setUploadingFile(false)
                setSelectedFiles(null)
                if(fileInputRef.current) fileInputRef.current.value = ''
            }
        }
    }

    return (
        <div className="content-container">
            <h5 className="page-message">
                Welcome to your campaign's compendium traveler. Enjoy!
            </h5>

            {compendium.root.length === 0 &&
                Object.keys(compendium.folders).length === 0 && (
                <div className="page-message">
                    For now your compendium is empty, try uploading something on your
                    BackBlaze account.
                </div>
                )}

            {/* ROOT FILES */}
            {compendium.root.length > 0 && (
                <div className="compendium-card">
                {compendium.root.map((file) => (
                    <div key={file.fileId} className="file-item">
                    <span onClick={() => handleSelectFile(file.fileId)}>
                        {file.name}
                    </span>
                    <MdDeleteOutline
                        style={{ cursor: "pointer", marginLeft: "8px" }}
                        onClick={() => handleDeleteFile(file.fileId)}
                    />
                    </div>
                ))}

                <div
                    className={`create-campaign-button ${loading ? 'disabled' : ''}`}
                    onClick={() => handleUploadFile(undefined)}
                >
                    {loading && <span className="spinner"></span>}
                    {loading ? ' Uploading...' : 'Upload File'}
                </div>
                </div>
            )}

            {/* FOLDERS */}
            {Object.entries(compendium.folders).map(([folderName, files]) => {
                const isOpen = openFolders[folderName]

                return (
                <div key={folderName} className="compendium-card">
                    {/* FOLDER HEADER */}
                    <div
                    className="folder-header"
                    onClick={() => toggleFolder(folderName)}
                    >
                    <span className="folder-icon">
                        {isOpen ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
                    </span>
                    <span className="folder-name">{folderName}</span>
                    </div>

                    {/* FILES */}
                    {isOpen && (
                    <div className="folder-files">
                        {files.map((file) => (
                        <div key={file.fileId} className="file-item">
                            <span onClick={() => handleSelectFile(file.fileId)}>
                            {file.name}
                            </span>
                            <MdDeleteOutline
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            onClick={() => handleDeleteFile(file.fileId)}
                            />
                        </div>
                        ))}
                    </div>
                    )}

                    {/* Upload button para carpeta */}
                    <div
                        className={`create-campaign-button ${loading ? 'disabled' : ''}`}
                        onClick={() => handleUploadFile(folderName)}
                    >
                        {loading && <span className="spinner"></span>}
                        {loading ? ' Uploading...' : 'Upload File'}
                    </div>
                </div>
                );
            })}

            {/* Invisible input for file uploading */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
            />

        </div>
    )
}