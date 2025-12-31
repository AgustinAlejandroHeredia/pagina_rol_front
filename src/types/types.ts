export interface PlayerHome {
  alias: string
  realName: string
}

export interface CampaignHome {
  _id: string
  campaignName: string
  players: PlayerHome[]
}

export interface MapElem {
  name: string,
  description: string,
  type: string,
  visible: boolean,
  layer: number,
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
}

export interface UpdateCampaign {
  name: string,
  description: string,
  system: string,
}