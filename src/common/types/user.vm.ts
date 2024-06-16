export interface User {
  name: string
  username: string
  surname?: string
  email: string
  birthday?: string
  password?: string
  avatar?: Avatar
  id?: number
}

export interface Avatar {
  title: string
  url: string
  id: number
}
