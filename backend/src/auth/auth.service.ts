import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private httpServices: HttpService) {}
    // headers: {
    //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //   },
    //   form: {
    //     grant_type: 'client_credentials'
    //   },
    async login() {
        const data = this.httpServices.post('https://accounts.spotify.com/api/token', {
            "grant_type": "client_credentials"
        }, {
            headers: {
                'Authorization': 'Basic ' + (Buffer.from('492c7f8871b44434a229741f10363d69' + ':' + '157c818a52be4c698d1585676f14529f', 'base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
              }   
        }).pipe((map((result) => result.data)))
        console.log(data)
    }
}
