import type { MapElemType } from "../CampaignMap.types";

// ICON STYLES
import { SlLocationPin } from "react-icons/sl";
import { LiaMapMarkerAltSolid } from "react-icons/lia"

const SIZE = 25 //36

export interface MapElemIconConfig {
    color: string
    Icon: React.ComponentType<{ size?: number; color?: string }>
    size?: number
}

export const MAP_ELEM_ICON_CONFIG: Record<MapElemType, MapElemIconConfig> = {
    capital: {
        color: '#e63946',
        Icon: SlLocationPin,
        size: SIZE,
    },
    city: {
        color: '#457b9d',
        Icon: SlLocationPin,
        size: SIZE,
    },
    continent: {
        color: '#2a9d8f',
        Icon: SlLocationPin,
        size: SIZE,
    },
    location: {
        color: '#f4a261',
        Icon: SlLocationPin,
        size: SIZE,
    },
    interest_point: {
        color: '#ffb703',
        Icon: SlLocationPin,
        size: SIZE,
    },
    geography_mark: {
        color: '#8ecae6',
        Icon: SlLocationPin,
        size: SIZE,
    },
    deity: {
        color: '#9b5de5',
        Icon: SlLocationPin,
        size: SIZE,
    },
    area: {
        color: '#6c757d',
        Icon: SlLocationPin,
        size: SIZE,
    },
}
