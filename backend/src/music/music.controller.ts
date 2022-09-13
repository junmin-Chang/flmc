import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import AuthRequired from '../common/decorators/auth.decorator';
import { MusicRegisterDto } from './dto/music-register.dto';
import { MusicService } from './music.service';

@UseGuards(AuthGuard('jwt'))
@Controller('music')
export class MusicController {
  constructor(private musicServices: MusicService) {}

  @Get(':keyword')
  async getMusicByKeyword(@Param('keyword') keyword: string) {
    return await this.musicServices.getSongsByKeyword(keyword);
  }

  @Get(':userId/:playlist')
  async getSongsByPlaylist(
    @Param('userId') userId: string,
    @Param('playlist') playlist: string,
  ) {
    return await this.musicServices.getSongsByPlaylist(userId, playlist);
  }
  @Post('add')
  async addMusic(
    @Body() musicRegisterDto: MusicRegisterDto,
    @AuthRequired() user: User,
  ) {
    return await this.musicServices.addSong(musicRegisterDto, user);
  }
}
