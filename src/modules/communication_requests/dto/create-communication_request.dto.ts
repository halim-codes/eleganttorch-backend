import { IsString, IsOptional, IsEnum } from 'class-validator';
import { RequestStatus } from '../entities/communication_request.entity'; 

export class CreateCommunicationRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsEnum(RequestStatus, {
    message: 'الحالة يجب أن تكون: في الانتظار، جاري العمل عليه، أو تم الانتهاء',
  })
  @IsOptional()
  status?: RequestStatus; 
}
