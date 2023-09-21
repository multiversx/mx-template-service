import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true })
  identifier?: string;

  @Prop()
  name?: string;

  @Prop()
  accounts?: number;

  @Prop()
  transactions?: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
