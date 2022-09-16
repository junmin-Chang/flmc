import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../provider/password.service';
import { PrismaService } from '../provider/prisma.service';
import { UserService } from '../user/user.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaServices: PrismaService,
    private jwtService: JwtService,
    private readonly userServices: UserService,
    private readonly passwordServices: PasswordService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { userId, password } = loginDto;
    const user = await this.prismaServices.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new HttpException('존재하지 않는 유저', HttpStatus.BAD_REQUEST);
    }
    const validatePassword = await this.passwordServices.comparePassword(
      password,
      user.password,
    );
    if (!validatePassword) {
      throw new HttpException('비밀번호가 틀림', HttpStatus.UNAUTHORIZED);
    }
    delete user.password;

    return {
      accessToken: await this.createAccessToken({ userId: user.userId }),
      refreshToken: await this.createRefreshToken({ userId: user.userId }),
      userInfo: user,
    };
  }
  async register(registerUserDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.userServices.createUser(registerUserDto);
    delete user.password;
    return {
      accessToken: await this.createAccessToken({ userId: user.userId }),
      refreshToken: await this.createRefreshToken({ userId: user.userId }),
      userInfo: user,
    };
  }

  async createAccessToken(payload: { userId: string }): Promise<any> {
    return this.jwtService.sign(payload);
  }
  async createRefreshToken(payload: { userId: string }): Promise<any> {
    return this.jwtService.sign(payload, {
      secret: 'jwtSecret',
      expiresIn: '14d',
    });
  }
  async validateRefreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: 'jwtSecret',
      });

      const user = await this.prismaServices.user.findUnique({
        where: { userId },
      });
      delete user.password;
      return {
        accessToken: await this.createAccessToken({ userId }),
        refreshToken: await this.createRefreshToken({ userId }),
        userInfo: user,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
