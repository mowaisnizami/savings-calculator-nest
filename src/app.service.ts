import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { service: 'savings-calculator-api', status: 'ok' };
  }
}
