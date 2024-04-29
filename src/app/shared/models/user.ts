export interface User {
  id: string
  username: string
  createdAt: string
}

export interface AdminUsersStats {
  count: number
  stats: {
    count: number
    date: string
  }[]
}
