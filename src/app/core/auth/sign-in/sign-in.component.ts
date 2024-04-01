import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'cauquen-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInComponent implements AfterViewInit {
  @ViewChild('uiContainer') uiContainer: ElementRef | null = null;

  loading = true;

  constructor(@Inject(AuthService) private auth: AuthService) {}

  ngAfterViewInit() {
    if (!this.uiContainer) {
      return;
    }

    this.auth.startUI(this.uiContainer.nativeElement).finally(() => {
      const buttons = document.getElementsByClassName('firebaseui-idp-button');
      if (buttons && buttons[0]) {
        this.loading = false;
      }
    });
  }

  onSignIn() {
    if (this.loading) {
      return;
    }

    const buttons = document.getElementsByClassName('firebaseui-idp-button');
    if (buttons && buttons[0]) {
      (<HTMLButtonElement>buttons[0]).click();
      this.loading = true;
      this.auth.signIn();
    }
  }
}
