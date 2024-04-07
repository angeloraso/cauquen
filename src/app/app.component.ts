import { Component, Inject, OnInit } from '@angular/core';
import { RouterService } from '@bizy/services';
import { AuthService } from '@core/auth/auth.service';
import { ROOT_PATHS } from '@core/constants';
import { DatabaseService, MobileService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(MobileService) private mobile: MobileService,
    @Inject(AuthService) private auth: AuthService,
    @Inject(DatabaseService) private database: DatabaseService,
    @Inject(RouterService) private router: RouterService
  ) {}

  async ngOnInit() {
    try {
      if (this.mobile.isMobile()) {
        await this.mobile.init();
        this.mobile.backButton$.subscribe(() => {
          if (ROOT_PATHS.includes(this.router.getURL())) {
            this.mobile.exit();
          } else {
            this.router.goBack();
          }
        });

        this.mobile.hideSplash();

        this.auth.signedIn$.subscribe(signedIn => {
          console.log('APP: SIGNED IN', signedIn);
          if (!signedIn) {
            this.database.destroy();
          }

          console.log('APP: GO TO /');
          this.router.goTo({ path: '/' });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
