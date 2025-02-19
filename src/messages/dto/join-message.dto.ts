import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';

export class JoinMessageDto extends PickType(CreateMessageDto, ['name']) {}
