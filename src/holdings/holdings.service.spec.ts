import { NotFoundException } from '@nestjs/common';
import { HoldingsService } from './holdings.service';

describe('HoldingsService', () => {
  let service: HoldingsService;

  beforeEach(() => {
    service = new HoldingsService();
  });

  it('calculates a portfolio summary from seeded holdings', () => {
    expect(service.summary()).toEqual({
      invested: 5890,
      currentValue: 6814,
      gain: 924,
      gainPercent: 15.69,
      holdings: 3,
    });
  });

  it('creates, updates and removes a holding', () => {
    const created = service.create({
      symbol: ' msft ',
      name: 'Microsoft',
      assetType: 'STOCK',
      units: 2,
      averagePrice: 400,
      currentPrice: 420,
    });
    expect(created.symbol).toBe('MSFT');
    expect(service.update(created.id, { currentPrice: 430 }).currentPrice).toBe(
      430,
    );
    service.remove(created.id);
    expect(() => service.findOne(created.id)).toThrow(NotFoundException);
  });
});
