import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlockchainController } from './controllers/blockchain/blockchain.controller';
import { BlockchainService } from './services/blockchain/blockchain.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [BlockchainController],
  providers: [
    BlockchainService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
