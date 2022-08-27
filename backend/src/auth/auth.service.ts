import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as qs from 'qs'
@Injectable()
export class AuthService {
    constructor(private httpServices: HttpService) {}
    // headers: {
    //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //   },
    //   form: {
    //     grant_type: 'client_credentials'
    //   },
     getToken(): Observable<string> {
        const data = qs.stringify({ 'grant_type' : 'client_credentials'})
        const response = this.httpServices.post('https://accounts.spotify.com/api/token', 
        data,
         {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              auth: {
                username: process.env.CLIENT_ID,
                password: process.env.CLIENT_SECRET

              }  
        }).pipe((map((result) => result.data)))
        return response.pipe(map((res) => res.access_token))
      }
}
