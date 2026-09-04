import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateHoldingDto, UpdateHoldingDto } from './holding.dto';
import { Holding, PortfolioSummary } from './holding';

@Injectable()
export class HoldingsService {
  private readonly holdings = new Map<string, Holding>();

  constructor() {
    [
      {
        symbol: 'VOO',
        name: 'Vanguard S&P 500 ETF',
        assetType: 'ETF' as const,
        units: 6,
        averagePrice: 425,
        currentPrice: 489,
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        assetType: 'STOCK' as const,
        units: 10,
        averagePrice: 174,
        currentPrice: 228,
      },
      {
        symbol: 'CASH',
        name: 'Emergency fund',
        assetType: 'CASH' as const,
        units: 1,
        averagePrice: 1600,
        currentPrice: 1600,
      },
    ].forEach((holding) => this.create(holding));
  }

  findAll(): Holding[] {
    return [...this.holdings.values()].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
  }

  findOne(id: string): Holding {
    const holding = this.holdings.get(id);
    if (!holding) throw new NotFoundException(`Holding ${id} was not found`);
    return holding;
  }

  create(input: CreateHoldingDto): Holding {
    const now = new Date().toISOString();
    const holding: Holding = {
      ...input,
      id: randomUUID(),
      symbol: input.symbol.trim().toUpperCase(),
      name: input.name.trim(),
      createdAt: now,
      updatedAt: now,
    };
    this.holdings.set(holding.id, holding);
    return holding;
  }

  update(id: string, input: UpdateHoldingDto): Holding {
    const current = this.findOne(id);
    const holding = {
      ...current,
      ...input,
      symbol: input.symbol?.trim().toUpperCase() ?? current.symbol,
      name: input.name?.trim() ?? current.name,
      updatedAt: new Date().toISOString(),
    };
    this.holdings.set(id, holding);
    return holding;
  }

  remove(id: string): void {
    this.findOne(id);
    this.holdings.delete(id);
  }

  summary(): PortfolioSummary {
    const holdings = this.findAll();
    const invested = holdings.reduce(
      (sum, item) => sum + item.units * item.averagePrice,
      0,
    );
    const currentValue = holdings.reduce(
      (sum, item) => sum + item.units * item.currentPrice,
      0,
    );
    const gain = currentValue - invested;
    return {
      invested: this.round(invested),
      currentValue: this.round(currentValue),
      gain: this.round(gain),
      gainPercent: invested ? this.round((gain / invested) * 100) : 0,
      holdings: holdings.length,
    };
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
