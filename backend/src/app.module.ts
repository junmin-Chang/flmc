import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GlobalHttpModule } from './http/http.module';
import { MusicModule } from './music/music.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    GlobalHttpModule,
    ConfigModule.forRoot({
    isGlobal: true
  }),
  AuthModule,
  MusicModule
],
})
export class AppModule {}
