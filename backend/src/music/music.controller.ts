import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import AuthRequired from '../common/decorators/auth.decorator';
import { MusicRegisterDto } from './dto/music-register.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private musicServices: MusicService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':keyword')
  async getMusicByKeyword(@Param('keyword') keyword: string) {
    return await this.musicServices.getSongsByKeyword(keyword);
  }

  @Get(':userId/:playlist')
  async getSongsByPlaylist(
    @Param('userId') userId: string,
    @Param('playlist') playlistName: string,
  ) {
    return await this.musicServices.getSongsByPlaylist(userId, playlistName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addMusic(
    @Body() musicRegisterDto: MusicRegisterDto,
    @AuthRequired() user: User,
  ) {
    return await this.musicServices.addSong(musicRegisterDto, user);
  }
}
