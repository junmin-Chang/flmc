import { Controller, Get, Param } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private musicServices: MusicService) {}
    @Get(':musicId')
    async getMusicById(@Param('musicId') musicId: string) {
        return await this.musicServices.getMusicMyId(musicId)
    }
}
