import type { RelativeCoords } from "./CampaignMap.types"

    export function toRelativeCoords(
        x: number,
        y: number,
        width: number,
        height: number
    ): RelativeCoords {
        return {
            x: x / width,
            y: y / height,
        }
    }

    export function fromRelativeCoords(
        coords: RelativeCoords,
        width: number,
        height: number
    ) {
    return {
        x: coords.x * width,
        y: coords.y * height,
    }
}
