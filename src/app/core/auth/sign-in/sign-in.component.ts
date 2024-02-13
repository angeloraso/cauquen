import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { PATH } from '@app/app.routing';
import { RouterService } from '@bizy/services';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'cauquen-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInComponent {
  @ViewChild('password') passwordInput: ElementRef | null = null;

  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  public showError = false;
  showPassword = false;
  hideLogo = false;
  loading = false;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UntypedFormBuilder) private formBuilder: UntypedFormBuilder,
    @Inject(RouterService) private router: RouterService
  ) {
    this.form = this.formBuilder.group({
      email: ['', { updateOn: 'blur', validators: [Validators.email, Validators.required] }],
      password: ['', { updateOn: 'change', validators: [Validators.required] }]
    });
  }

  get email() {
    return this.form.get('email') as FormControl<string>;
  }

  get password() {
    return this.form.get('password') as FormControl<string>;
  }

  async onSignIn() {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.authService
      .signIn({ email: this.email?.value, password: this.password?.value })
      .then(() => {
        this.router.goTo({ path: `/${PATH.HOME}` });
      })
      .catch(async error => {
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  fixAutoFill(email: Event, password: any) {
    if (email) {
      this.email?.setValue((email.target as HTMLInputElement).value);
    }

    if (password) {
      this.password?.setValue(password);
    }
  }

  passwordEnter(event: any) {
    if (event.key === 'Enter') {
      this.onSignIn();
    }
  }

  nextInput(event: any) {
    if (event.key === 'Enter' && this.passwordInput) {
      this.passwordInput.nativeElement.focus();
    }
  }
}
