export interface RegisterDto {
  username: string;
  userId: string;
  password: string;
}

export interface LoginDto {
  userId: string;
  password: string;
}

export interface User {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: {
    username: string;
    userId: string;
    playlist: string[];
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
  } | null;
}
