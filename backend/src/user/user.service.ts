import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from '../provider/password.service';
import { PrismaService } from '../provider/prisma.service';

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

  async addPlaylist(playlist: string, user) {
    const result = await this.prismaServices.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        playlist: {
          push: playlist,
        },
      },
    });

    if (result) {
      return playlist;
    }
  }
}
