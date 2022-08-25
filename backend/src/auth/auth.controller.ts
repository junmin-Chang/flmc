import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService) {}

    @Post('login')
    private async login() {
        return await this.authServices.login()
    }

}
