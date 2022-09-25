import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from '../provider/password.service';
import { PrismaService } from '../provider/prisma.service';
import { AddPlaylistDto } from './dto/add-playlist.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaServices: PrismaService,
    private passwordServices: PasswordService,
  ) {}

  async getUserInfo(userId: string) {
    const userToGet = await this.prismaServices.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        playlist: true,
      },
    });

    if (!userToGet) return null;
    delete userToGet.password;
    return userToGet;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const userExists = await this.prismaServices.user.findUnique({
      where: { userId: data.userId },
    });
    if (userExists) {
      throw new HttpException('유저가 이미 존재함', HttpStatus.CONFLICT);
    }

    const passwordHashed = await this.passwordServices.hashPassword(
      data.password,
    );
    const user = await this.prismaServices.user.create({
      data: {
        ...data,
        password: passwordHashed,
      },
    });
    delete user.password;
    return user;
  }

  async addPlaylist(name: string, desc: string, user) {
    const playlistsUserHave = await this.prismaServices.playlist.findMany({
      where: {
        userId: user.userId,
      },
    });

    if (playlistsUserHave.length === 5) {
      throw new HttpException('최대 플레이리스트', HttpStatus.BAD_REQUEST);
    }
    const result = await this.prismaServices.playlist.create({
      data: {
        name,
        desc,
        userId: user.userId,
      },
    });
    if (result) {
      return result;
    }
  }

  async deletePlaylist(playlistId: string, user) {
    const result = await this.prismaServices.playlist.deleteMany({
      where: {
        id: playlistId,
        userId: user.userId,
      },
    });

    return result;
  }

  async updatePlaylistDesc(playlistId: string, body: AddPlaylistDto, user) {
    const result = await this.prismaServices.playlist.updateMany({
      where: {
        userId: user.userId,
        id: playlistId,
      },
      data: {
        ...body,
      },
    });

    return result;
  }
}
