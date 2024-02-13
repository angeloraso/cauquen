import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PATH as APP_PATH } from '@app/app.routing';
import { PopupService, RouterService, TranslateService } from '@bizy/services';
import { ConfirmPopupComponent } from '@components/confirm-popup';
import { PATH as AUTH_PATH } from '@core/auth/auth.routing';
import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';
import { AboutPopupComponent } from './about-popup/about-popup.component';

@Component({
  selector: 'cauquen-config',
  templateUrl: './config.html',
  styleUrls: ['./config.css']
})
export class ConfigComponent implements OnInit, OnDestroy {
  #subscription = new Subscription();
  loading = false;

  constructor(
    @Inject(PopupService) private aboutPopup: PopupService<AboutPopupComponent, void>,
    @Inject(PopupService) private confirmPopup: PopupService<ConfirmPopupComponent, boolean>,
    @Inject(AuthService) private auth: AuthService,
    @Inject(RouterService) private router: RouterService,
    @Inject(TranslateService) private translate: TranslateService
  ) {}

  async ngOnInit() {
    try {
      console.log('config');
    } catch (error) {
      console.debug(error);
    }
  }

  openPopup(): void {
    this.aboutPopup.open({ component: AboutPopupComponent });
  }

  onSignOut(): void {
    if (this.loading) {
      return;
    }

    this.confirmPopup.open({
      component: ConfirmPopupComponent,
      data: {
        title: this.translate.get('CONFIG.SIGN_OUT_POPUP.TITLE'),
        msg: `${this.translate.get('CONFIG.SIGN_OUT_POPUP.MSG')}: ${this.auth.getEmail()}`
      }
    });

    this.#subscription.add(
      this.confirmPopup.closed$.subscribe((res: boolean) => {
        if (res) {
          this.loading = true;
          this.auth
            .signOut()
            .then(() => {
              this.router.goTo({ path: `/${APP_PATH.AUTH}/${AUTH_PATH.SIGN_IN}` });
            })
            .finally(() => (this.loading = false));
        }
      })
    );
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe;
  }
}
