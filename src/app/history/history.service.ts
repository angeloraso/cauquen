import { Inject, Injectable } from '@angular/core';
import { IHistoryRecord } from '@core/model';
import { DatabaseService } from '@core/services';

@Injectable()
export class HistoryService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getHistory() {
    return new Promise<Array<IHistoryRecord>>(async (resolve, reject) => {
      try {
        const history = await this.database.getHistory();
        if (history) {
          resolve(history as Array<IHistoryRecord>);
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  addRecord(record: IHistoryRecord): Promise<void> {
    return this.database.postHistoryRecord(record);
  }
}
