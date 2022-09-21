import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from '../provider/prisma.service';
import { TokenService } from '../provider/token.service';
import { MusicRegisterDto } from './dto/music-register.dto';

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

  async addSong(musicRegisterDto: MusicRegisterDto, user: User) {
    const { songId, playlistId, title, singer, image } = musicRegisterDto;
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
        songId,
        title,
        image,
        singer,

        user: {
          connect: { userId: user.userId },
        },
        playlist: {
          connect: { id: playlistId },
        },
      },
    });
    return result;
  }

  async getSongsByPlaylist(userId: string, playlistId: string) {
    const songsToGet = await this.prismaServices.song.findMany({
      where: {
        userId,
        playlistId,
      },
    });
    return songsToGet;
  }

  async deleteSongByIds(ids: string[], user) {
    const result = await this.prismaServices.song.deleteMany({
      where: {
        userId: user.userId,
        id: {
          in: ids,
        },
      },
    });

    return result;
  }
}
