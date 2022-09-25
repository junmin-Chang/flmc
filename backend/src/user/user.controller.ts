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
import { AddPlaylistDto } from './dto/add-playlist.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get(':userId')
  async getUserInfo(@Param('userId') userId: string) {
    return await this.userServices.getUserInfo(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('playlist')
  async addPlaylist(@Body() body: AddPlaylistDto, @AuthRequired() user: User) {
    return await this.userServices.addPlaylist(body.name, body.desc, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('playlist/:playlistId')
  async deletePlaylist(
    @Param('playlistId') playlistId: string,
    @AuthRequired() user: User,
  ) {
    return await this.userServices.deletePlaylist(playlistId, user);
  }
}
