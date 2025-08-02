import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutUsDocument = AboutUs & Document;

@Schema({ timestamps: true })
export class AboutUs {

  @Prop({ required: true })
  about_us: string;

  @Prop({ required: true })
  vision: string;

  @Prop({ required: true })
  mission: string;
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
