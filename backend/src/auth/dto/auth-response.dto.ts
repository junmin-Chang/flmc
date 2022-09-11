import { User } from '@prisma/client';

export class AuthResponse {
  refreshToken: string;
  accessToken: string;
  userInfo: User;
}
