import { Component, Inject } from '@angular/core';
import { RouterService } from '@bizy/services';
import { AuthService } from '@core/auth/auth.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'cauquen-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInComponent {
  loading = false;

  constructor(
    @Inject(AuthService) private auth: AuthService,
    @Inject(RouterService) private router: RouterService
  ) {
    this.auth.signedIn$.pipe(filter(value => value === true), take(1)).subscribe(() => {
      this.router.reload(true);
    });
  }

  onSignIn() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.auth.signIn();
  }
}
