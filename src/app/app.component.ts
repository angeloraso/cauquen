import { Component, Inject, OnInit } from '@angular/core';
import { ROOT_PATHS } from '@core/constants';
import { MobileService, RouterService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(MobileService) private mobile: MobileService,
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
      }
    } catch (error) {
      console.error(error);
    }
  }
}
