import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { assetTypes, AssetType } from './holding';

export class CreateHoldingDto {
  @IsString()
  @MaxLength(12)
  symbol!: string;

  @IsString()
  @MaxLength(80)
  name!: string;

  @IsIn(assetTypes)
  assetType!: AssetType;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 6 })
  @Min(0.000001)
  units!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  averagePrice!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  currentPrice!: number;
}

export class UpdateHoldingDto {
  @IsOptional() @IsString() @MaxLength(12) symbol?: string;
  @IsOptional() @IsString() @MaxLength(80) name?: string;
  @IsOptional() @IsIn(assetTypes) assetType?: AssetType;
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 6 })
  @Min(0.000001)
  units?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  averagePrice?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  currentPrice?: number;
}
