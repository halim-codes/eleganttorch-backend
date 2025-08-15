import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class CoInformation {
    @Prop()
    phone: string;

    @Prop()
    address?: string;

    @Prop()
    email?: string;

    @Prop()
    tikTok?: string;

    @Prop()
    instagram?: string;

    @Prop()
    facebook?: string;

    @Prop()
    youtube?: string;

    @Prop()
    twitter?: string;
}

export type CoInformationDocument = CoInformation & Document;
export const CoInformationSchema = SchemaFactory.createForClass(CoInformation);
