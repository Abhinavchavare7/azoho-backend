import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
@Prop({ type: Types.ObjectId, ref: 'User', required: true })
userId: Types.ObjectId;

@Prop({ type: Object })
basicInfo: any;

@Prop({ type: Object })
contactInfo: any;

@Prop({ type: Object })
work: any;

@Prop({ type: Object })
personal: any;

@Prop({ type: Object })
summary: any;

@Prop({ type: Object })
passportDetails: any;

@Prop({ type: [Object] })
workExperience: any[];

@Prop({ type: [Object] })
familyMediclaim2024_25: any[];

@Prop({ type: [Object] })
vehiclePassDetails: any[];

@Prop({ type: [String] })
tags: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);