export default function transformNumberOfVisitorsHistory (
  numberOfVisitorsHistory: NpbSeasonInterface[],
  teams: NpbTeamInterface[],
  unit: number = 1
): number[][] {
  return numberOfVisitorsHistory
    .map(h => h.data)
    .reduce((memo, data) => {
      data.forEach(d => memo[d.team] = [d.value / unit].concat(memo[d.team]))
      return memo
    }, teams.map(() => []))
}
