import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHoldingDto, UpdateHoldingDto } from './holding.dto';
import { HoldingsService } from './holdings.service';

@Controller('holdings')
export class HoldingsController {
  constructor(private readonly holdings: HoldingsService) {}

  @Get()
  findAll() {
    return this.holdings.findAll();
  }

  @Get('summary')
  summary() {
    return this.holdings.summary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holdings.findOne(id);
  }

  @Post()
  create(@Body() input: CreateHoldingDto) {
    return this.holdings.create(input);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateHoldingDto) {
    return this.holdings.update(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.holdings.remove(id);
  }
}
