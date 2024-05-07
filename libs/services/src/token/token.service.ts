import { TokenRepository } from "@libs/database";
import { Token } from "@libs/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
  ) { }

  async create(token: Token): Promise<Token> {
    return await this.tokenRepository.create(token);
  }

  async findAll(): Promise<Token[]> {
    return await this.tokenRepository.findAll();
  }
}
