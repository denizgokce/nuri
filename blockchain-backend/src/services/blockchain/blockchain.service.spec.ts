import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainService } from './blockchain.service';
import { HttpModule } from '@nestjs/axios';

describe('BlockchainService', () => {
  let service: BlockchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BlockchainService],
    }).compile();

    service = module.get<BlockchainService>(BlockchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBlocks', () => {
    it('should return an array of blocks', () => {
      service.getBlocks().subscribe((response: any[]) => {
        expect(response.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getBlockDetail', () => {
    it('should return an array of blocks', () => {
      service
        .getBlockDetail(
          '00000000000000000008a22fb37ed80dcecf59e56a46d8e89e70bf854aa4b3b6',
        )
        .subscribe((response: any) => {
          expect(response).toBeInstanceOf(Object);
        });
    });
  });
});
