import { Token, TokenDocument } from "@libs/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TokenRepository {
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
