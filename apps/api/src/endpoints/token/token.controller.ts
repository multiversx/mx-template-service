import { Token } from '@libs/entities';
import { TokenService } from '@libs/services';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('tokens')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Post()
  async create(@Body() token: Token) {
    await this.tokenService.create(token);
  }

  @Get()
  async findAll(): Promise<Token[]> {
    return await this.tokenService.findAll();
  }
}
