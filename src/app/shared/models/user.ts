export interface User {
  id: string
  username: string
  email: string
  enabled: boolean
  createdAt: string
  banReason?: string
}

export type UserFromAdmin = Pick<User, 'createdAt' | 'id' | 'username' | 'enabled' | 'banReason'>
