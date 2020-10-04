import { createReducer, createSelector, on } from '@ngrx/store'
import { Lobby } from '../../shared/models/lobby'
import * as LobbyActions from '../actions/lobby.actions'
import { AppState } from './index.reducer'

export interface LobbyState {
  lobby?: Lobby
  role?: string
  gameNames?: string[]
}
export const initialState: LobbyState = {}

export const lobbyReducer = createReducer(
  initialState,
  on(LobbyActions.join, (state, { lobby, role, gameNames }) => ({ lobby, role, gameNames })),
  on(LobbyActions.updateLobby, (state, { lobby }) => ({ ...state, lobby })),
  on(LobbyActions.updateGameNames, (state, { gameNames }) => ({ ...state, gameNames })),
  on(LobbyActions.updateLobbyUsers, (state, { lobbyUsers }) => ({
    ...state,
    lobby: { ...state.lobby, users: lobbyUsers },
  })),
  on(LobbyActions.updateLobbyStatus, (state, { status }) => ({
    ...state,
    lobby: { ...state.lobby, status },
  })),
  on(LobbyActions.disconnect, () => ({}))
)
export const selectLobbyState = (state: AppState): LobbyState => state.lobby

export const selectLobby = createSelector(selectLobbyState, (state: LobbyState) => {
  return state.lobby
})

export const selectLobbyStatus = createSelector(selectLobbyState, (state: LobbyState) => {
  return state.lobby?.status
})
export const selectLobbyUsers = createSelector(selectLobbyState, (state: LobbyState) => {
  return state.lobby?.users
})
export const selectLobbyCurrentMusic = createSelector(selectLobbyState, (state: LobbyState) => {
  return state.lobby?.currentMusic
})
export const selectGameNames = createSelector(selectLobbyState, (state: LobbyState) => {
  return state.gameNames
})
