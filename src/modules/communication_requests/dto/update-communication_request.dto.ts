import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunicationRequestDto } from './create-communication_request.dto';

export class UpdateCommunicationRequestDto extends PartialType(CreateCommunicationRequestDto) {}
