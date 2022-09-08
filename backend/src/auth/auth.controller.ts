import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authServices.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authServices.register(registerDto);
  }

  @Post('refresh')
  async getToken(@Body() { token }: { token: string }) {
    return await this.authServices.validateRefreshToken(token);
  }
}
