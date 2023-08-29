import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/token.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) { }

  async create(token: Token): Promise<Token> {
    const createdToken = await this.tokenModel.create(token);
    return createdToken;
  }

  async findAll(): Promise<Token[]> {
    return await this.tokenModel.find().exec();
  }
}
