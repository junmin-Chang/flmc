import { Module } from '@nestjs/common';
import { PasswordService } from '../provider/password.service';
import { PrismaService } from '../provider/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PasswordService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
