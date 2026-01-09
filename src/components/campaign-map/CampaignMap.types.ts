export interface CampaignMapProps {
    imageUrl: string
    campaignId: string
    isDungeonMaster?: boolean
    selectionMode?: boolean
    onMapClick?: (coords: { x: number; y: number }) => void
    rightSpace?: boolean
}

export interface MapSize {
    width: number
    height: number
}

export type MapCoords = {
    x: number
    y: number
}

export interface RelativeCoords {
    x: number // 0 - 1
    y: number // 0 - 1
}