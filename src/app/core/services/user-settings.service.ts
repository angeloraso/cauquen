import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { COUNTRY_CODE, ROLE } from '@core/model';
import { DatabaseService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
  readonly #database = inject(DatabaseService);
  readonly #auth = inject(AuthService);

  isAdmin = async (): Promise<boolean> => {
    try {
      const email = this.#auth.getEmail();
      if (!email) {
        return false;
      }

      const roles = await this.#database.getUserRoles(email);
      return roles && roles.includes(ROLE.ADMIN);
    } catch {
      return false;
    }
  };

  getCountry = async (): Promise<COUNTRY_CODE> => {
    const email = this.#auth.getEmail();
    if (!email) {
      return COUNTRY_CODE.ARGENTINA;
    }

    const country = await this.#database.getUserCountry(email);
    return country ?? COUNTRY_CODE.ARGENTINA;
  };

  putCountry = (country: COUNTRY_CODE): Promise<void> => {
    const email = this.#auth.getEmail();
    if (!email) {
      throw new Error();
    }

    return this.#database.putUserCountry({ email, country });
  };
}
