import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService) {}

    @Post('token')
    private getToken() {
        return this.authServices.getToken()
    }
}
