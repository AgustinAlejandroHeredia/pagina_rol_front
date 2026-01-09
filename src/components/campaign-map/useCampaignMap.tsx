import { useEffect, useRef } from 'react'

// TYPES
import type { MapCoords } from './CampaignMap.types'
import type { MapElem } from '../../types/types'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

import { CampaignMapService } from '../../services/CampaignMapService'

export function useCampaignMap(
    imageUrl: string,
    selectionMode: boolean,
    campaignId: string,
    onMapClick?: (coords: MapCoords) => void,
    onMapElemSelect?: (elem: MapElem) => void,
) {
    const mapRef = useRef<L.Map | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const selectionModeRef = useRef(selectionMode)

    // SHOW ELEMENTS BY LAYERS
    const currentLayerRef = useRef<number | null>(null) // visible layer now
    const loadedLayersRef = useRef<Set<number>>(new Set()) // not to ask this again
    const markersRef = useRef<L.LayerGroup | null>(null) // visible markers

    const initializedRef = useRef(false)


    function zoomToLayer(zoom: number): number {
        if (zoom <= -1.5) return 1
        if (zoom <= -0.5) return 2
        return 3
    }


    function renderElements(elements: any[]) {
        if (!mapRef.current) return
            const map = mapRef.current

        if (!markersRef.current) {
            markersRef.current = L.layerGroup().addTo(map)
        }

        markersRef.current.clearLayers()

        elements.forEach(elem => {

            /*
            const marker = L.circleMarker(
                [elem.y, elem.x],
                {
                    radius: 8,
                    color: '#ff0000',
                    weight: 2,
                    fill: true,
                    fillColor: '#ff0000',
                    fillOpacity: 0.9,
                    pane: 'markerPane',
                }
            )
            */

            const marker = L.marker(
                [elem.y, elem.x]
            )

            marker.bindTooltip(elem.name, {
                direction: 'top',
                offset: [-13, -10],
                opacity: 0.9,
            })

            marker.on('click', () => {
                onMapElemSelect?.(elem)
            })

            marker.addTo(markersRef.current!)
        })
    }


    async function loadLayer(layer: number) {
        //if (loadedLayersRef.current.has(layer)) return

        const elements = await CampaignMapService.getMapsElemsByCampaignIdAndLayer(campaignId, layer)

        loadedLayersRef.current.add(layer)
        renderElements(elements)
    }


    // Mantener el valor actualizado (evita closures viejas)
    useEffect(() => {
        selectionModeRef.current = selectionMode
    }, [selectionMode])

    // Crear mapa SOLO una vez
    useEffect(() => {
        //if (!containerRef.current || mapRef.current) return

        if (!containerRef.current) return
        if (initializedRef.current) return

        initializedRef.current = true

        const map = L.map(containerRef.current, {
            crs: L.CRS.Simple,
            zoomControl: true,
            attributionControl: false,
            minZoom: -2,
            maxZoom: 1,
            zoomSnap: 0.15,
        })

        mapRef.current = map

        const img = new Image()
        img.src = imageUrl

        img.onload = async () => {
            const bounds: L.LatLngBoundsExpression = [
                [0, 0],
                [img.height, img.width],
            ]

            L.imageOverlay(imageUrl, bounds).addTo(map)

            map.setMaxBounds(bounds)
            map.options.maxBoundsViscosity = 1.0

            map.fitBounds(bounds)
            map.setZoom(map.getMinZoom())

            const initialLayer = 1
            currentLayerRef.current = initialLayer

            await loadLayer(initialLayer)
        }
    }, [imageUrl])


    useEffect(() => {
        if (!mapRef.current) return
        const map = mapRef.current

        const handleClick = (e: L.LeafletMouseEvent) => {
            if (!selectionModeRef.current) return

            const { lat, lng } = e.latlng
            onMapClick?.({ x: lng, y: lat })
        }

        map.on('click', handleClick)

        return () => {
            map.off('click', handleClick)
        }
    }, [onMapClick])


    // DETECT ZOOM IN OR OUT
    useEffect(() => {
        if (!mapRef.current) return

        const map = mapRef.current

        const handleZoomEnd = async () => {
            const zoom = map.getZoom()
            const newLayer = zoomToLayer(zoom)

            if (newLayer === currentLayerRef.current) return

            currentLayerRef.current = newLayer
            await loadLayer(newLayer)
        }

        map.on('zoomend', handleZoomEnd)

        return () => {
            map.off('zoomend', handleZoomEnd)
        }
        }, [])


    return { mapRef, containerRef }
}
