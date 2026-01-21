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
  alias: string,
}

export interface Campaign {
  _id: string,
  name: string,
  description: string,
  dungeonMaster: PlayerCampaign,
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

export interface Invite {
  _id: string,
  campaign_id: string,
  from_mongo_id: string,
  for_mongo_id: string,
  expires_at: Date,
  token: string,
}

export interface User {
  _id: string,
  name: string,
  email: string,
}