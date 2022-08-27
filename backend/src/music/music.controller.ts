import { Controller, Get, Param } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private musicServices: MusicService) {}

    @Get(':keyword')
    async getMusicByKeyword(@Param('keyword') keyword: string) {
        return await this.musicServices.getMusicByKeyword(keyword)
    }
}
