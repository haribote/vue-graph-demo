declare module '*.json' {
  const content: any
  export default content
}

interface NpbLeagueInterface {
  id: number
  name: string

}

interface NpbLeaguesInterface {
  leagues: NpbLeagueInterface[]
}

interface NpbTeamInterface {
  id: number
  name: string
  color: string
  league: number
}

interface NpbTeamsInterface {
  teams: NpbTeamInterface[]
}

interface NpbHistoryDataInterface {
  team: number
  value: number
}

interface NpbSeasonInterface {
  season: number
  data: NpbHistoryDataInterface[]
}

interface NpbSeasonsInterface {
  seasons: NpbSeasonInterface[]
}
