export default function transformNumberOfVisitorsHistory (
  numberOfVisitorsHistory: NpbSeasonInterface[],
  teams: NpbTeamInterface[]
): number[][] {
  return numberOfVisitorsHistory
    .map(h => h.data)
    .reduce((memo, data) => {
      data.forEach(d => memo[d.team] = [d.value].concat(memo[d.team]))
      return memo
    }, teams.map(() => []))
}
