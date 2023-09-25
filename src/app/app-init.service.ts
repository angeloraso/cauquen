import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { config } from '@core/firebase.config';
import { DatabaseService } from '@core/services';
import { initializeApp } from 'firebase/app';

@Injectable()
export class AppInitService {
  constructor(
    @Inject(DatabaseService) private database: DatabaseService,
    @Inject(AuthService) private auth: AuthService
  ) {}

  init(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const app = initializeApp(config);
        await Promise.all([this.database.start(app), this.auth.start(app)]);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
