import { createContext, useContext, useState } from "react";

type CoordinatorType = {
    isLoadingCampaign: boolean
    setIsLoadingCampaign: (v: boolean) => void

    isDungeonMaster: boolean
    setIsDungeonMaster: (v: boolean) => void

    selectedOption: string
    setSelectedOption: (v: string) => void
}

const Coordinator = createContext<CoordinatorType | null> (null)

export function CoordinatorProvider({ children } : { children: React.ReactNode }) {

    const [isLoadingCampaign, setIsLoadingCampaign] = useState(false)

    const [isDungeonMaster, setIsDungeonMaster] = useState(false)

    const [selectedOption, setSelectedOption] = useState('')

    return (
        <Coordinator.Provider value={{ 
            isLoadingCampaign, setIsLoadingCampaign,
            isDungeonMaster, setIsDungeonMaster,
            selectedOption, setSelectedOption,
        }}>
            {children}
        </Coordinator.Provider>
    )

}

export function useCoordinator() {
    const ctx = useContext(Coordinator)
    if(!ctx) throw new Error ("useCoordinator must be inside CoordinatorProvider")
    return ctx  
}