import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  imports: [AuthModule],
  controllers: [MusicController],
  providers: [MusicService, AuthService]
})
export class MusicModule {}
