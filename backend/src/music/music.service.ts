import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MusicService {
    constructor(private httpServices: HttpService, private authServices: AuthService) {}
     async getMusicMyId(musicId: string) {
        const data = this.httpServices.get(`https://api.spotify.com/v1/tracks/${musicId}`, {
            headers: {
                'Authorization': `Bearer ` + await lastValueFrom(this.authServices.getToken())
            }
        })
        .pipe((map((response) => response.data)))

        return data;
    }
}
