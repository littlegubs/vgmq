import { createReducer, createSelector, on } from '@ngrx/store'
import { Lobby } from '../../shared/models/lobby'
import * as LobbyActions from '../actions/lobby.actions'
import { AppState } from './index.reducer'

export interface LobbyState {
  lobby?: Lobby
  role?: string
}
export const initialState: LobbyState = {}

export const lobbyReducer = createReducer(
  initialState,
  on(LobbyActions.join, (state, { lobby, role }) => ({ lobby, role })),
  on(LobbyActions.updateConfig, (state, { lobby }) => ({ ...state, lobby })),
  on(LobbyActions.updateLobbyUsers, (state, { lobbyUsers }) => ({
    ...state,
    lobby: { ...state.lobby, lobbyUsers },
  })),
  on(LobbyActions.disconnect, () => ({}))
)
export const selectLobby = (state: AppState): LobbyState => state.lobby

export const selectLobbyUsers = createSelector(selectLobby, (state: LobbyState) => {
  return state.lobby?.lobbyUsers
})
