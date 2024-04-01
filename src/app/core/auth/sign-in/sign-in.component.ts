import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { RouterService } from '@bizy/services';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'cauquen-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('uiContainer') uiContainer: ElementRef | null = null;

  loading = false;

  constructor(
    @Inject(AuthService) private auth: AuthService,
    @Inject(RouterService) private router: RouterService
  ) {}

  async ngOnInit() {
    try {
      const signIn = sessionStorage.getItem('signIn');
      if (signIn === 'pending') {
        this.loading = true;
        const result = await this.auth.getSignInResult();
        if (result) {
          sessionStorage.setItem('signIn', 'done');
          this.router.reload(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  onSignIn() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    sessionStorage.setItem('signIn', 'pending');
    this.auth.signIn();
  }
}
