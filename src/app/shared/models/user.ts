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
}

export type UserFromAdmin = Pick<User, 'createdAt' | 'id' | 'username' | 'enabled' | 'banReason'>
