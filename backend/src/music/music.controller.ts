import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import AuthRequired from '../common/decorators/auth.decorator';
import { MusicRegisterDto } from './dto/music-register.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private musicServices: MusicService) {}

  @Get(':keyword')
  async getMusicByKeyword(@Param('keyword') keyword: string) {
    return await this.musicServices.getMusicByKeyword(keyword);
  }

  @Post('add')
  async addMusic(
    @Body() musicRegisterDto: MusicRegisterDto,
    @AuthRequired() user: User,
  ) {
    return await this.musicServices.addMusic(musicRegisterDto, user);
  }
}
