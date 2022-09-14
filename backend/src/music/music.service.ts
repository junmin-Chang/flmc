import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from '../provider/prisma.service';
import { TokenService } from '../provider/token.service';

@Injectable()
export class MusicService {
  constructor(
    private httpServices: HttpService,
    private tokenServices: TokenService,
    private prismaServices: PrismaService,
  ) {}
  async getMusicMyId(musicId: string) {
    const data = this.httpServices
      .get(`https://api.spotify.com/v1/tracks/${musicId}`, {
        headers: {
          Authorization:
            `Bearer ` + (await lastValueFrom(this.tokenServices.getToken())),
        },
      })
      .pipe(map((response) => response.data));

    return data;
  }

  async getSongsByKeyword(keyword: string) {
    const token = await lastValueFrom(this.tokenServices.getToken());
    const { data } = await lastValueFrom(
      this.httpServices.get(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track,artist&limit=10`,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        },
      ),
    );
    return data.tracks.items;
  }

  async addSong(musicRegisterDto, user: User) {
    const { songId } = musicRegisterDto;
    const isExists = await this.prismaServices.song.findFirst({
      where: {
        songId,
        userId: user.id,
      },
    });

    if (isExists) {
      throw new HttpException('이미 등록된 노래입니다', HttpStatus.BAD_REQUEST);
    }

    const result = await this.prismaServices.song.create({
      data: {
        ...musicRegisterDto,
        user: {
          connect: { userId: user.userId },
        },
      },
    });
    return result;
  }

  async getSongsByPlaylist(userId: string, playlist: string) {
    const songsToGet = await this.prismaServices.song.findMany({
      where: {
        userId,
        playlist: decodeURI(decodeURIComponent(playlist)),
      },
    });
    return songsToGet;
  }
}
