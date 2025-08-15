import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunicationRequestDocument = CommunicationRequest & Document;

export enum RequestStatus {
  PENDING = 'في الانتظار',
  IN_PROGRESS = 'جاري العمل عليه',
  COMPLETED = 'تم الانتهاء',
}

@Schema({ timestamps: true })
export class CommunicationRequest {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;

  @Prop({
    type: String,
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CommunicationRequestSchema = SchemaFactory.createForClass(CommunicationRequest);
CommunicationRequestSchema.index({ createdAt: 1 });

