import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as qs from 'qs';

@Injectable()
export class TokenService {
  constructor(private httpServices: HttpService) {}

  getToken(): Observable<string> {
    const data = qs.stringify({ grant_type: 'client_credentials' });
    const response = this.httpServices
      .post('https://accounts.spotify.com/api/token', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      })
      .pipe(map((result) => result.data));
    return response.pipe(map((res) => res.access_token));
  }
}
