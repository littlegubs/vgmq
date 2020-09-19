import { createAction, props } from '@ngrx/store'
import { Lobby } from '../../shared/models/lobby'
import { LobbyUser } from '../../shared/models/lobby-user'

export const join = createAction('[Lobby] Join', props<{ lobby?: Lobby; role?: string }>())
export const updateConfig = createAction('[Lobby] update config', props<{ lobby?: Lobby }>())
export const updateLobbyUsers = createAction('[Lobby] update lobbyUsers', props<{ lobbyUsers?: LobbyUser[] }>())

export const disconnect = createAction('[Lobby] Disconnect')
