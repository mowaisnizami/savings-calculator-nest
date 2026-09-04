export const assetTypes = ['STOCK', 'ETF', 'MUTUAL_FUND', 'CASH'] as const;
export type AssetType = (typeof assetTypes)[number];

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  assetType: AssetType;
  units: number;
  averagePrice: number;
  currentPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSummary {
  invested: number;
  currentValue: number;
  gain: number;
  gainPercent: number;
  holdings: number;
}
