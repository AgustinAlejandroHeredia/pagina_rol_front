export interface Player {
  alias: string
  realName: string
}

export interface Campaign {
  _id: string
  campaignName: string
  players: Player[]
}