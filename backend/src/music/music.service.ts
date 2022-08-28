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
        private prismaServices: PrismaService
        ) {}
     async getMusicMyId(musicId: string) {
        const data = this.httpServices.get(`https://api.spotify.com/v1/tracks/${musicId}`, {
            headers: {
                'Authorization': `Bearer ` + await lastValueFrom(this.tokenServices.getToken())
            }
        })
        .pipe((map((response) => response.data)))

        return data;
    }

    async getMusicByKeyword(keyword: string) {
        const data = this.httpServices.get(`https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=10`, {
            headers: {
                'Authorization': `Bearer ` + await lastValueFrom(this.tokenServices.getToken())
            }
        }).pipe(map((response) => response.data))

        return data;
    }

    async addMusic(musicRegisterDto, user: User) {
        const { songId } = musicRegisterDto
        const isExists = await this.prismaServices.song.findFirst({
            where: {
                songId,
                user
            }
        })

        if (isExists) {
            throw new HttpException('이미 등록된 노래입니다', HttpStatus.BAD_REQUEST)
        }

        const result = await this.prismaServices.song.create({
            data: {
                ...musicRegisterDto,
                userId: user.userId
            }
        })
        delete user.userId
        return result;
    }
}
