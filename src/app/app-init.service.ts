import { Inject, Injectable } from '@angular/core';
import { config } from '@core/firebase.config';
import { DatabaseService } from '@core/services';
import { initializeApp } from 'firebase/app';

@Injectable()
export class AppInitService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  init(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const app = initializeApp(config);
        await this.database.start(app);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
