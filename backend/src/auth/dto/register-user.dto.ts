import { IsString, Max, Min } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Min(3)
  @Max(8)
  username: string;

  @IsString()
  @Min(7)
  @Max(12)
  userId: string;

  @IsString()
  @Min(8)
  @Max(15)
  password: string;
}
