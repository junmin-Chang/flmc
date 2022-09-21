import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Get(':userId/:playlistId')
  async getSongsByPlaylist(
    @Param('userId') userId: string,
    @Param('playlistId') playlistId: string,
  ) {
    return await this.musicServices.getSongsByPlaylist(userId, playlistId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addMusic(
    @Body() musicRegisterDto: MusicRegisterDto,
    @AuthRequired() user: User,
  ) {
    return await this.musicServices.addSong(musicRegisterDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async deleteSongByIds(
    @Body('ids') ids: string[],
    @AuthRequired() user: User,
  ) {
    return await this.musicServices.deleteSongByIds(ids, user);
  }
}
