export interface User {
  id: string
  username: string
  createdAt: string
}

export type AdminUsersStats = Pick<User, 'createdAt'>[]
