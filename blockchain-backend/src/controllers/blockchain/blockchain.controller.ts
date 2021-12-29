import {
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { BlockchainService } from '../../services/blockchain/blockchain.service';
import { Response } from 'express';
import * as _ from 'lodash';
import * as md5 from 'md5';
import { isNullOrUndefined } from 'util';

@Controller('api/blockchain')
export class BlockchainController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager,
    private readonly blockchainSrv: BlockchainService,
  ) {}

  cacheExpiration = 60; //second

  @Get('blocks')
  public async getBlocks(
    @Res() response: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const cacheKey = md5(`block-list-${limit}-${page}`);
    const cachedValue = await this.cacheManager.get(cacheKey);
    if (!isNullOrUndefined(cachedValue)) {
      response.status(HttpStatus.OK).json(JSON.parse(cachedValue));
    } else {
      this.blockchainSrv.getBlocks().subscribe(
        (res) => {
          const data = _(res)
            .slice(page * limit)
            .take(limit)
            .value();
          const value = {
            data,
            pageCount: Math.ceil(res.length / limit),
          };
          this.cacheManager.set(cacheKey, JSON.stringify(value), {
            ttl: this.cacheExpiration * 1000,
          });
          response.status(HttpStatus.OK).json(value);
        },
        (error) => {
          response.status(HttpStatus.OK).json([]);
        },
      );
    }
  }

  @Get('block')
  public async getBlockDetail(
    @Res() response: Response,
    @Query('hash') hash: string,
  ) {
    const cacheKey = md5(`block-${hash}`);
    const cachedValue = await this.cacheManager.get(cacheKey);
    if (!isNullOrUndefined(cachedValue)) {
      response.status(HttpStatus.OK).json(JSON.parse(cachedValue));
    } else {
      this.blockchainSrv.getBlockDetail(hash).subscribe(
        (res) => {
          this.cacheManager.set(cacheKey, JSON.stringify(res), {
            ttl: this.cacheExpiration * 1000,
          });
          response.status(HttpStatus.OK).json(res);
        },
        (error) => {
          response.status(HttpStatus.OK).send(error);
        },
      );
    }
  }
}
