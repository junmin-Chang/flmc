import { IsString, Max } from 'class-validator';

export class AddPlaylistDto {
  @IsString()
  @Max(6)
  name: string;

  @IsString()
  desc: string;
}
