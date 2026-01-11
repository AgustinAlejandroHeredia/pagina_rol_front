import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useCompendium } from "../hooks/useCompendium";
import ViewCampaignError from "../components/ViewCampaignError";
import Loading from "../components/Loading";
import { ConfirmModal } from "../components/ConfirmModal";

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

    type FileToDelete = {
        id: string
        name: string
    }

    const [showConfirmFile, setShowConfirmFile] = useState(false)
    const [fileToDelete, setFileToDelete] = useState<FileToDelete | null>(null)
    const [deletingFile, setDeletingFile] = useState(false)
    const [deletingFileError, setDeletingFileError] = useState(false)

    const [showConfirmFolder, setShowConfirmFolder] = useState(false)
    const [folderToDelete, setFolderToDelete] = useState<string>('')
    const [deletingFolder, setDeletingFolder] = useState(false)
    const [deletingFolderError, setDeletingFolderError] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)
    const [targetFoler, setTargetFolder] = useState<string>('root')
    const [uploadingFile, setUploadingFile] = useState(false)
    const [succesfulUpload, setSuccessfulUpload] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    // FOLDERS

    const [showCreateFolderOptions, setShowCreateFolderOptions] = useState(false)
    const [folderName, setFolderName] = useState('')
    const [creatingFolder, setCreatingFolder] = useState(false)
    const [creatingFolderSuccess, setCreatingFolderSucces] = useState(false)
    const [creatingFolderError, setCreatingFolderError] = useState(false)

    const { compendium, isAuthenticated, isDungeonMaster, loading, error, resetContent } = useCompendium(campaignId)

    // secutury
    useEffect(() => {

        const check = async () => {
            try {
                const isIn = await CompendiumService.isInCampaign(campaignId)
                if(!isIn){
                    navigate("/home")
                }
            } catch (error) {
                console.log("Error during check")
                navigate("/home")
            }
        }

        if(isAuthenticated && !loading){
            check()
        }
    }, [ campaignId, isAuthenticated, loading ])    

    if(loading) return <Loading />
    
    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }

    const resetMessages = () => {
        setDeletingFileError(false)
        setDeletingFolderError(false)
        setSuccessfulUpload(false)
        setUploadError(false)
        setCreatingFolderSucces(false)
        setCreatingFolderError(false)
    }

    const toggleFolder = (folderName: string) => {
        setOpenFolders(prev => ({
            ...prev,
            [folderName]: !prev[folderName],
        }))
    }

    const handleViewFile = (fileId: string, fileName: string) => {

        const extension = fileName.split('.').pop()?.toLowerCase()

        if (!extension) {
            console.warn("El archivo no tiene extensión")
            return
        }

        if (['jpg', 'jpeg', 'png'].includes(extension)) {
            window.open(`/view/images/${fileId}`, '_blank');
            return
        }

        if(extension === 'pdf'){
            window.open(`/view/pdf/${fileId}`, '_blank');
            return
        }

        if(extension === 'txt'){
            window.open(`/view/text/${fileId}`, '_blank');
            return
        }

        const downloadFile = async () => {
            try {
                const response = await fetch(`/backblaze/getFileById/${fileId}`)
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)

                const link = document.createElement("a")
                link.href = url
                link.download = fileName; // usamos el nombre real del archivo
                link.click()

                URL.revokeObjectURL(url)
            } catch (error) {
                console.error("Error downloading file:", error)
            }
        }

        downloadFile()
    }

    const handleConfirmDeleteFile = (fileName: string, fileId: string) => {
        setFileToDelete({ id: fileId, name: fileName })
        setShowConfirmFile(true)
    }

    const handleDeleteFile = async () => {
        if(!fileToDelete) return

        resetMessages()

        setDeletingFile(true)
        try {
            await CompendiumService.deleteFile(fileToDelete.id)
            resetContent()
        } catch (error) {
            setDeletingFileError(true)
        } finally {
            setDeletingFile(false)
            setShowConfirmFile(false)
            setFileToDelete(null)
        }
    }

    const handleConfirmDeleteFolder = (folderName: string) => {
        setFolderToDelete(folderName)
        setShowConfirmFolder(true)
    }

    const handleDeleteFolder = async () => {
        if(folderToDelete === '') return

        setDeletingFolder(true)
        try {
            await CompendiumService.deleteFolder(campaignId, folderToDelete)
            resetContent()
        } catch (error) {
            setDeletingFolderError(true)
        } finally {
            setDeletingFolder(false)
            setShowConfirmFolder(false)
            setFolderToDelete('')
        }
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
                // takes user to the top of the screen
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            } finally {
                setUploadingFile(false)
                setSelectedFiles(null)
                if(fileInputRef.current) fileInputRef.current.value = ''
            }
        }
    }

    const showNewFolderOptionsOn = () => {
        setShowCreateFolderOptions(true)
    }

    const showNewFolderOptionsOff = () => {
        setShowCreateFolderOptions(false)
    }

    const handleFolderName = (e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value)
    }

    const handleCreateFolder = async () => {
        if(folderName === '') return

        resetMessages()

        setCreatingFolder(true)
        try {
            await CompendiumService.createFolder(campaignId, folderName)
            setCreatingFolderSucces(true)
            resetContent()
        } catch (error) {
            setCreatingFolderError(true)
        } finally {
            setCreatingFolder(false)
            setFolderName('')
        }
    }

    return (
        <div className="content-container">
            <h5 className="page-message">
                Welcome to your campaign's compendium traveler. Enjoy!
            </h5>

            {/* EMPTY COMPENDIUM */}

            {compendium.root.length === 0 &&
                Object.keys(compendium.folders).length === 0 && (
                <div className="page-message">
                    For now your compendium is empty, try creating a new folder and uploading files there to star creating the structure of your compendium.
                </div>
            )}

            {/* ERRORS */}

            {succesfulUpload && (
                <div className="create-campaign-message-successful">
                    File/s upload successfully
                </div>
            )}

            {uploadError && (
                <div className="create-campaign-message-unsuccessful">
                    An error has ocurred during the upload of the file/s. Please try again and check if you sent only allowed files ( png, jpeg, jpg, txt, pdf, docx and excel )
                </div>
            )}

            {deletingFileError && (
                <div className="create-campaign-message-unsuccessful">
                    An error has ocurred deleting the file. Please try again later.
                </div>
            )}

            {deletingFolderError && (
                <div className="create-campaign-message-unsuccessful">
                    An error has ocurred deleting the folder. Please try again later.
                </div>
            )}

            {/* ROOT FILES */}
            {compendium.root.length > 0 && (
                <div className="compendium-card">
                {compendium.root.map((file) => (
                    <div key={file.fileId} className="file-item" onClick={() => handleViewFile(file.fileId, file.name)}>
                        
                        <span>
                            {file.name}
                        </span>

                        <MdDeleteOutline
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleConfirmDeleteFile(file.name, file.fileId)
                            }}
                        />

                    </div>
                ))}

                {isAuthenticated && isDungeonMaster && (
                    <div
                        className={`create-campaign-button ${uploadingFile ? 'disabled' : ''}`}
                        onClick={() => handleUploadFile(undefined)}
                    >
                        {uploadingFile && <span className="spinner"></span>}
                        {uploadingFile ? ' Uploading...' : 'Upload File'}
                    </div>
                )}


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
                            {files.length === 0 ? (
                                <div className="empty-folder">
                                    Empty folder
                                </div>
                            ) : (
                                files.map((file) => (
                                    <div key={file.fileId} className="file-item" onClick={() => handleViewFile(file.fileId, file.name)}>

                                        <span>
                                            {file.name}
                                        </span>

                                        <MdDeleteOutline
                                            style={{ cursor: "pointer", marginLeft: "8px" }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleConfirmDeleteFile(file.name, file.fileId)
                                            }}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Upload and delete button for folder */}
                    {isAuthenticated && isDungeonMaster &&  (
                        <div className="upload-actions">
                            <div
                                className={`create-campaign-button ${uploadingFile ? 'disabled' : ''}`}
                                onClick={() => handleUploadFile(folderName)}
                            >
                                {uploadingFile && <span className="spinner"></span>}
                                {uploadingFile ? ' Uploading...' : 'Upload File'}
                            </div>

                            <div
                                className={`eliminate-campaign-button delete-folder-button ${deletingFolder ? 'disabled' : ''}`}
                                onClick={() => handleConfirmDeleteFolder(folderName)}
                            >
                                {deletingFolder && <span className="spinner"></span>}
                                {deletingFolder ? ' Deleting...' : 'Delete Folder'}
                            </div>
                        </div>
                    )}
                </div>
                );
            })}

            {isAuthenticated && isDungeonMaster && !showCreateFolderOptions && (
                <div 
                    className="create-campaign-button"
                    onClick={showNewFolderOptionsOn}    
                >
                    Create Folder +
                </div>
            )}

            {isAuthenticated && isDungeonMaster && showCreateFolderOptions && (
                <div>

                    <div className="create-campaign-card">
                        <h5 className="page-create-message">Folder Name</h5>
                        <input
                            type="text"
                            name="system"
                            placeholder="Example : Characters sheets"
                            value={folderName}
                            onChange={handleFolderName}
                        />

                        {creatingFolderSuccess && (
                            <div className="create-campaign-message-successful">
                                Folder created succesfully
                            </div>
                        )}

                        {creatingFolderError && (
                            <div className="create-campaign-message-unsuccessful">
                                Something went wrong, please try again later.
                            </div>
                        )}

                    </div>

                    <div 
                        className="upload-actions"
                    >
                        <div 
                            className="create-campaign-button"
                            onClick={handleCreateFolder}    
                        >
                            {creatingFolder && <span className="spinner"></span>}
                            {creatingFolder ? ' Creating...' : 'Create Folder +'}
                        </div>

                        <div 
                            className="eliminate-campaign-button delete-folder-button"
                            onClick={showNewFolderOptionsOff}    
                        >
                            Cancel
                        </div>

                    </div>

                </div>
            )}

            {/* Invisible input for file uploading */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
                accept="
                    image/png,
                    image/jpeg,
                    image/jpg,
                    text/plain,b
                    text/html,
                    application/pdf,
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                "
            />

            {/* MODAL FILE */}
            <ConfirmModal
                isOpen={showConfirmFile}
                title="Delete File"
                message={
                    fileToDelete
                    ? `Do you want to delete the file "${fileToDelete.name}"?`
                    : ""
                }
                confirmText="Yes, delete the file"
                cancelText="Cancel, keep file"
                loading={deletingFile}
                onConfirm={handleDeleteFile}
                onCancel={() => {
                    setShowConfirmFile(false)
                    setFileToDelete(null)
                }}
            />

            {/* MODAL FOLDER */}
            <ConfirmModal
                isOpen={showConfirmFolder}
                title="Delete Folder"
                message={
                    folderToDelete
                    ? `Do you want to delete the folder "${folderToDelete}"?`
                    : ""
                }
                confirmText="Yes, delete the folder"
                cancelText="Cancel, keep folder"
                loading={deletingFile}
                onConfirm={handleDeleteFolder}
                onCancel={() => {
                    setShowConfirmFolder(false)
                    setFolderToDelete('')
                }}
            />

        </div>
    )
}