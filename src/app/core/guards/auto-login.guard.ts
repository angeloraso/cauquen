import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATH } from '@app/app.routing';
import { AuthService } from '@core/auth/auth.service';
import { map, take } from 'rxjs/operators';

export const autoLoginCanLoadGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        router.navigateByUrl(`/${PATH.HOME}`, { replaceUrl: true });
        return false;
      }

      return true;
    })
  );
};
