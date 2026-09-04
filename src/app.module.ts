import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HoldingsModule } from './holdings/holdings.module';

@Module({
  imports: [HoldingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
