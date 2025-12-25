import { createContext, useContext, useState } from "react";

type CoordinatorType = {
    isLoadingCampaign: boolean
    setIsLoadingCampaign: (v: boolean) => void
}

const Coordinator = createContext<CoordinatorType | null> (null)

export function CoordinatorProvider({ children } : { children: React.ReactNode }) {

    const [isLoadingCampaign, setIsLoadingCampaign] = useState(false)

    return (
        <Coordinator.Provider value={{ isLoadingCampaign, setIsLoadingCampaign }}>
            {children}
        </Coordinator.Provider>
    )

}

export function useCoordinator() {
    const ctx = useContext(Coordinator)
    if(!ctx) throw new Error ("useCoordinator must be inside CoordinatorProvider")
    return ctx  
}