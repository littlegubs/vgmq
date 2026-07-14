export interface User {
  id: string
  username: string
  email: string
  enabled: boolean
  createdAt: string
  banReason?: string
  patreonAccount: {
    premium: boolean
  } | null
  entitledTiers: string[]
  premium: boolean
}

export type UserFromAdmin = Pick<User, 'createdAt' | 'id' | 'username' | 'enabled' | 'banReason'> & {
  bannedBy?: Pick<User, 'username'> | null
}

export interface PaginatedUsersResponse {
  items: UserFromAdmin[]
  total: number
}

export interface GraphData {
  date: string
  count: number
}
