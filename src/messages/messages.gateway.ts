import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { JoinMessageDto } from './dto/join-message.dto';
import { TypingMessageDto } from './dto/type-message.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway(85, {
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  private logger = new Logger(MessagesGateway.name);
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    let message = this.messagesService.create(createMessageDto);
    this.logger.debug(message);
    this.server.emit('created', message);
    return message;
  }
  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }
  @SubscribeMessage('join')
  join(@MessageBody() data: JoinMessageDto, @ConnectedSocket() client: Socket) {
    return this.messagesService.join(data, client.id);
  }
  @SubscribeMessage('typing')
  typing(
    @MessageBody() typingMessageDto: TypingMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messagesService.getClient(client.id);
    this.logger.debug('this person is typeing ' + name);
    client.broadcast.emit('userTyping', {
      name,
      isTyping: typingMessageDto.isTyping,
    });
    return {
      name,
      isTyping: typingMessageDto.isTyping,
    };
  }
}
