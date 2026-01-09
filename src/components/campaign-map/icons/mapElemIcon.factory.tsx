// mapElemIcon.factory.ts
import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { MAP_ELEM_ICON_CONFIG } from './mapElemIcon'
import type { MapElem } from '../../../types/types'
import type { MapElemType } from '../CampaignMap.types'

export function createMapElemIcon(elem: MapElem): L.DivIcon {
  const config = MAP_ELEM_ICON_CONFIG[elem.type as MapElemType]

  const IconComponent = config.Icon
  const size = config.size ?? 32

  return L.divIcon({

    html: ReactDOMServer.renderToString(
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent
          size={size}
          color={config.color}
        />
      </div>
    ),

    className: 'custom-map-elem-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],

  })
}
