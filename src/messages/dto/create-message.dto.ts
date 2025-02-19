import { IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @Max(40)
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  message: string;
  timestamp: string;
}
