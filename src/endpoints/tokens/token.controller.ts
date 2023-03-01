import { Body, Controller, Get, Post } from '@nestjs/common';
import { Token } from './schemas/token.schema';
import { TokenService } from './token.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokenService: TokenService) { }

  @Post()
  async create(@Body() token: Token) {
    await this.tokenService.create(token);
  }

  @Get()
  async findAll(): Promise<Token[]> {
    return await this.tokenService.findAll();
  }
}
