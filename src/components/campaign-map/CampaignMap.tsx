import type { CampaignMapProps } from './CampaignMap.types'
import { useCampaignMap } from './useCampaignMap'
import './campaignMap.css'
import { useEffect } from 'react'

export function CampaignMap({
  imageUrl,
  campaignId,
  selectionMode = false,
  onMapClick,
  onMapElemSelect,
  rightSpace,
  onReloadMapElems,
}: CampaignMapProps) {

    const { mapRef, containerRef, reloadMarkers } = useCampaignMap(imageUrl, selectionMode, campaignId, onMapClick, onMapElemSelect)

    useEffect(() => {
        if(onReloadMapElems){
            onReloadMapElems(reloadMarkers)
        }
    }, [reloadMarkers, onReloadMapElems])

    useEffect(() => {
        if(!mapRef.current || !containerRef.current) return;

        const map = mapRef.current;
        const container = containerRef.current;

        // Usamos ResizeObserver para detectar cambios de tamaño
        const observer = new ResizeObserver(() => {
            map.invalidateSize({ animate: true });
        });

        observer.observe(container);

        return () => {
            observer.disconnect();
        }

    }, [rightSpace, mapRef, containerRef]);

    return (
        <div className="campaign-map-wrapper">
        <div
            ref={containerRef}
            className={`campaign-map-leaflet-container ${rightSpace ? 'with-sidecard' : ''}`}
            data-campaign-id={campaignId}
        />
        </div>
    )
}