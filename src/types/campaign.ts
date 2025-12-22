export interface Player {
  alias: string
  realName: string
}

export interface Campaign {
  campaignName: string
  players: Player[]
}