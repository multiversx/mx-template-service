import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Put, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiResponse } from "@nestjs/swagger";
import { CacheValue } from "./entities/cache.value";
import { NativeAuthAdminGuard, NativeAuthGuard } from "@multiversx/sdk-nestjs-auth";
import { CacheService } from "@multiversx/sdk-nestjs-cache";

@Controller()
export class CacheController {
  constructor(
    private readonly cacheService: CacheService,
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
  ) { }

  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @Get("/caching/:key")
  @ApiResponse({
    status: 200,
    description: 'The cache value for one key',
    type: String,
  })
  @ApiResponse({
    status: 404,
    description: 'Key not found',
  })
  async getCache(@Param('key') key: string): Promise<unknown> {
    const value = await this.cacheService.getRemote(key);
    if (!value) {
      throw new HttpException('Key not found', HttpStatus.NOT_FOUND);
    }
    return JSON.stringify(value);
  }

  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @Put("/caching/:key")
  @ApiResponse({
    status: 200,
    description: 'Key has been updated',
  })
  async setCache(@Param('key') key: string, @Body() cacheValue: CacheValue) {
    await this.cacheService.setRemote(key, cacheValue.value, cacheValue.ttl);
    this.clientProxy.emit('deleteCacheKeys', [key]);
  }

  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @Delete("/caching/:key")
  @ApiResponse({
    status: 200,
    description: 'Key has been deleted from cache',
  })
  @ApiResponse({
    status: 404,
    description: 'Key not found',
  })
  async delCache(@Param('key') key: string) {
    const keys = await this.cacheService.delete(key);
    this.clientProxy.emit('deleteCacheKeys', keys);
  }

  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @Get("/caching")
  async getKeys(
    @Query('keys') keys: string,
  ): Promise<string[]> {
    return await this.cacheService.getKeys(keys);
  }
}
