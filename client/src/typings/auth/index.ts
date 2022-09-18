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
  playlist: { id: string; name: string; desc: string }[];
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
}
