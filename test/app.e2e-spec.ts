import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => app.close());

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect({ service: 'savings-calculator-api', status: 'ok' });
  });

  it('creates a validated holding and recalculates the summary', async () => {
    await request(app.getHttpServer())
      .post('/api/holdings')
      .send({
        symbol: 'msft',
        name: 'Microsoft',
        assetType: 'STOCK',
        units: 2,
        averagePrice: 400,
        currentPrice: 425,
      })
      .expect(201)
      .expect((response) => {
        const body = JSON.parse(response.text) as { symbol: string };
        expect(body.symbol).toBe('MSFT');
      });

    return request(app.getHttpServer())
      .get('/api/holdings/summary')
      .expect(200)
      .expect((response) => {
        const body = JSON.parse(response.text) as { holdings: number };
        expect(body.holdings).toBe(4);
      });
  });
});
