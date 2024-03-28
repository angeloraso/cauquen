import { Inject, Injectable } from '@angular/core';
import { COUNTRY_CODE, ROLE } from '@core/model';
import { DatabaseService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  isAdmin() {
    return new Promise<boolean>(async resolve => {
      try {
        const settings = await this.database.getUserSettings();
        if (settings && Array.isArray(settings.roles) && settings.roles.includes(ROLE.ADMIN)) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch {
        resolve(false);
      }
    });
  }

  getCountry() {
    return new Promise<COUNTRY_CODE>(async (resolve, reject) => {
      try {
        const settings = await this.database.getUserSettings();
        resolve(settings ? settings.country : COUNTRY_CODE.ARGENTINA);
      } catch (error) {
        reject(error);
      }
    });
  }
}
