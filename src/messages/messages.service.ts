import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JoinMessageDto } from './dto/join-message.dto';
import { TypingMessageDto } from './dto/type-message.dto';

@Injectable()
export class MessagesService {
  private logger = new Logger(MessagesService.name);
  messages = [
    {
      name: 'Virender',
      message: 'manish gandu hai',
      timestamp: '2025-02-19T12:43:24.778Z',
    },
  ];
  clientToUser = {};
  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto, status: true };
    this.messages.push(message);
    this.logger.debug(this.messages);
    return message;
  }

  findAll() {
    return this.messages;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  join(joinMessageDto: JoinMessageDto, clientId: string) {
    this.clientToUser[clientId] = joinMessageDto.name;
    this.logger.debug(this.clientToUser);
    return Object.values(this.clientToUser);
  }
  typing(typingMessageDto: TypingMessageDto, clientId: string) {}
  getClient(clientId: string) {
    return this.clientToUser[clientId];
  }
}
