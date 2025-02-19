import { Module, ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { APP_PIPE } from '@nestjs/core';
import { WsException } from '@nestjs/websockets';

@Module({
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
