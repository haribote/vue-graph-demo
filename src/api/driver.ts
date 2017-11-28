import axios, { AxiosPromise, AxiosResponse } from 'axios'

import { API_NPB_LEAGUES, API_NPB_TEAMS, API_NUMBER_OF_VISITORS_HISTORY, API_PENNANT_RACE_HISTORY } from './endpoints'

export function get<T> (url): AxiosPromise<T> {
  return axios.get<T>(url)
}

export function handleResponse<T> (resp: AxiosResponse<T>) {
  return resp.data
}

export function fetchNpbLeagues (): Promise<NpbLeagueInterface[]> {
  return get<NpbLeaguesInterface>(API_NPB_LEAGUES)
    .then(resp => handleResponse<NpbLeaguesInterface>(resp))
    .then(data => data.leagues)
}

export function fetchNpbTeams (): Promise<NpbTeamInterface[]> {
  return get<NpbTeamsInterface>(API_NPB_TEAMS)
    .then(resp => handleResponse<NpbTeamsInterface>(resp))
    .then(data => data.teams)
}

export function fetchNpbNumberOfVisitorsHistory (): Promise<NpbSeasonInterface[]> {
  return get<NpbSeasonsInterface>(API_NUMBER_OF_VISITORS_HISTORY)
    .then(resp => handleResponse<NpbSeasonsInterface>(resp))
    .then(data => data.seasons)
}

export function fetchNpbPennantRaceHistory (): Promise<NpbSeasonInterface[]> {
  return get<NpbSeasonsInterface>(API_PENNANT_RACE_HISTORY)
    .then(resp => handleResponse<NpbSeasonsInterface>(resp))
    .then(data => data.seasons)
}
