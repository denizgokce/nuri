import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Api Calls', () => {
    it('/api/blockchain/blocks (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/blockchain/blocks`)
        .expect(200);
      expect(response.body).not.toBe(null);
      expect(response.body.data).not.toBe(null);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      return response;
    });

    it('/api/blockchain/block/:hash (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get(
          `/api/blockchain/block?hash=00000000000000000006d6cbb7a4ba133a6777ae3f7c7d97ac2de848d037904a`,
        )
        .expect(200);
      expect(response.body).not.toBe(null);
      expect(response.body).not.toBe(null);
      expect(response.body.hash).not.toBe(null);
      expect(response.body.hash.length).toBeGreaterThan(0);
      return response;
    });
  });
});
