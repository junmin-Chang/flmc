import { Module } from '@nestjs/common';
import { PrismaService } from '../provider/prisma.service';
import { TokenService } from '../provider/token.service';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService, TokenService, PrismaService]
})
export class MusicModule {}
