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
        const roles = await this.database.getUserRoles();
        resolve(roles && roles.includes(ROLE.ADMIN));
      } catch {
        resolve(false);
      }
    });
  }

  getCountry() {
    return new Promise<COUNTRY_CODE>(async (resolve, reject) => {
      try {
        const country = await this.database.getUserCountry();
        resolve(country ?? COUNTRY_CODE.ARGENTINA);
      } catch (error) {
        reject(error);
      }
    });
  }

  putCountry(country: COUNTRY_CODE) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.database.putUserCountry(country);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
