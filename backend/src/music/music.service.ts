import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { TokenService } from '../provider/token.service';

@Injectable()
export class MusicService {
    constructor(private httpServices: HttpService, private tokenServices: TokenService) {}
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
}
