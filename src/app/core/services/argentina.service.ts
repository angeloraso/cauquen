import { Inject, Injectable } from '@angular/core';
import { COUNTRY_CODE, IInflation } from '@core/model';
import { DatabaseService } from './database.service';
@Injectable()
export class ArgentinaService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getInflation(data?: { from: number; to: number }): Promise<Array<IInflation>> {
    let from: number = Date.now();
    let to: number = Date.now();

    if (data) {
      from = data.from;
      to = data.to;
    }

    if (!data || !data.from) {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      from = date.getTime();
    }

    if (!data || !data.to) {
      to = Date.now();
    }

    return this.database.getInflation({ country: COUNTRY_CODE.ARGENTINA, from, to }) as Promise<
      Array<IInflation>
    >;
  }
}
