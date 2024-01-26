import { Inject, Injectable } from '@angular/core';
import { HistoryRecord, IHistoryRecord } from '@core/model';
import { DatabaseService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getHistory() {
    return new Promise<Array<IHistoryRecord>>(async (resolve, reject) => {
      try {
        const history = await this.database.getHistory();
        resolve(history ?? []);
      } catch (error) {
        reject(error);
      }
    });
  }

  postRecord(record: Omit<IHistoryRecord, 'id'>): Promise<void> {
    return this.database.postHistoryRecord(new HistoryRecord(record));
  }

  putRecord(record: IHistoryRecord): Promise<void> {
    return this.database.putHistoryRecord(record);
  }

  deleteRecord(record: IHistoryRecord): Promise<void> {
    return this.database.deleteHistoryRecord(record.id);
  }
}
