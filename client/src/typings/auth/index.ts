export interface RegisterDto {
  username: string;
  userId: string;
  password: string;
}

export interface LoginDto {
  userId: string;
  password: string;
}

export interface UserInfo {
  username: string;
  userId: string;
  playlist: Playlist[];
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
}

export interface Playlist {
  id: string;
  name: string;
  desc: string;
}
