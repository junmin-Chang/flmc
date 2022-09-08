import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  userId: string;

  @IsString()
  password: string;
}
