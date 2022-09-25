import { IsString, Max } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Max(8)
  username: string;

  @IsString()
  userId: string;

  @IsString()
  password: string;
}
