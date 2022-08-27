import { Module } from '@nestjs/common';
import { TokenService } from '../provider/token.service';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService, TokenService]
})
export class MusicModule {}
