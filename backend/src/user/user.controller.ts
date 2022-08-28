import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userServices: UserService) {}


    @Get(':id')
    async getUserInfo(@Param(':id') userId: string): Promise<User> {
        return this.userServices.getUserInfo({ userId })
    } 
}
