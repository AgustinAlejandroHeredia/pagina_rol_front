import type { MapElem } from "../../types/types"

export interface CampaignMapProps {
    imageUrl: string
    campaignId: string
    isDungeonMaster?: boolean
    selectionMode?: boolean
    onMapClick?: (coords: { x: number; y: number }) => void
    onMapElemSelect?: (elem: MapElem) => void
    rightSpace?: boolean
    onReloadMapElems?: (reloadMarkers: () => void) => void
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

export type MapElemType = 
  | 'capital'
  | 'city'
  | 'continent'
  | 'location'
  | 'interest_point'
  | 'geography_mark'
  | 'deity'
  | 'area'