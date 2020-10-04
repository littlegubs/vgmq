import { createAction, props } from '@ngrx/store'
import { Lobby } from '../../shared/models/lobby'
import { LobbyUser } from '../../shared/models/lobby-user'

export const join = createAction('[Lobby] Join', props<{ lobby?: Lobby; role?: string; gameNames?: string[] }>())
export const updateLobby = createAction('[Lobby] update config', props<{ lobby?: Lobby }>())
export const updateGameNames = createAction('[Lobby] update game names', props<{ gameNames: string[] }>())
export const updateLobbyUsers = createAction('[Lobby] update users', props<{ lobbyUsers?: LobbyUser[] }>())
export const updateLobbyStatus = createAction('[Lobby] update status', props<{ status: string }>())

export const disconnect = createAction('[Lobby] Disconnect')
