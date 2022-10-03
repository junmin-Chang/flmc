import { IsString, Max, Min } from 'class-validator';

export class AddPlaylistDto {
  @IsString()
  @Min(1)
  @Max(6)
  name: string;

  @IsString()
  @Min(3)
  @Max(100)
  desc: string;
}
