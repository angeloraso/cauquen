import { Component, Inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'cauquen-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInComponent {
  loading = false;

  constructor(@Inject(AuthService) private auth: AuthService) {}

  onSignIn() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.auth.signIn();
  }
}
