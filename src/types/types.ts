export interface PlayerHome {
  alias: string
  realName: string
}

export interface CampaignHome {
  _id: string
  campaignName: string
  players: PlayerHome[]
}

export interface NewMapElem {
  name: string,
  description: string,
  type: string,
  visible: boolean,
  layer: number,
  x: number,
  y: number,
}

export interface MapElem {
  _id: string,
  name: string,
  description: string,
  type: string,
  visible: boolean,
  layer: number,
  x: number,
  y: number,
  pictureId: string,
}

export interface PlayerCampaign {
  mongo_id: string
  auth0_id: string,
  name: string,
  email: string,
}

export interface Campaign {
  name: string,
  description: string,
  dungeonMaster: string,
  system: string,
  users: PlayerCampaign[],
  mapElems: MapElem[],
  mapId: string,
}

export interface UpdateCampaign {
  name: string,
  description: string,
  system: string,
}

export interface ViewPlayerType {
  name: string,
  alias: string,
}