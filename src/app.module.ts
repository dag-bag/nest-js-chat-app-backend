import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveModule } from './live/live.module';
import { MessagesModule } from './messages/messages.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [LiveModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
