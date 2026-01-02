import { useEffect, useState } from "react"
import { useCompendium } from "../hooks/useCompendium";
import ViewCampaignError from "../components/ViewCampaignError";
import Loading from "../components/Loading";

// AUTH0
import { useAuth0Bridge } from '../auth/auth0-bridge'
import { useAuth0 } from "@auth0/auth0-react";

// NAVIGATION
import { useNavigate, useParams } from "react-router-dom";

// ICONS
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";

export function CompendiumPage() {

    const navigate = useNavigate()

    const { campaignId } = useParams<{ campaignId: string }>()

    if(campaignId === undefined){
        console.log("No campaign id provided")
        return <ViewCampaignError/>
    }

    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({})

    const { compendium, isAuthenticated, isAdmin, loading, error } = useCompendium(campaignId)

    if(loading) return <Loading />
    
    if(error){
        console.log(error)
        return <ViewCampaignError/>
    }

    const handleSelectFile = (fileId: string) => {
        console.log("SE SELECCIONA LA ID ", fileId)
    }

    const toggleFolder = (folderName: string) => {
        setOpenFolders(prev => ({
            ...prev,
            [folderName]: !prev[folderName],
        }))
    }

    return (
        <div className="content-container">

            <h5 className='page-message'>
                Welcome to your campaign's compendium traveler. 
                Enjoy!
            </h5>

            {compendium.root.length === 0 && 
                Object.keys(compendium.folders).length === 0 && (
                    <div className="page-message">
                        For now your compendium is empty, try uploading something on your BackBlaze account.
                    </div>
            )}

            {/* ROOT FILES */}
            {compendium.root.length > 0 && (
                <div className="compendium-card">

                    {compendium.root.map(file => (
                        <div
                            key={file.fileId}
                            className="file-item"
                            onClick={() => handleSelectFile(file.fileId)}
                        >
                            {file.name}
                        </div>
                    ))}
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
                    <span className="folder-name">
                    {folderName}
                    </span>
                </div>

                {/* FILES */}
                {isOpen && (
                    <div className="folder-files">
                    {files.map(file => (
                        <div
                        key={file.fileId}
                        className="file-item"
                        onClick={() => handleSelectFile(file.fileId)}
                        >
                        {file.name}
                        </div>
                    ))}
                    </div>
                )}

                </div>
            )
            })}
        </div>
    )
}