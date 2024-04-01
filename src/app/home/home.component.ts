import { Component, Inject, OnInit } from '@angular/core';
import { PATH as APP_PATH } from '@app/app.routing';
import { RouterService } from '@bizy/services';
import { AuthService } from '@core/auth/auth.service';
import { LOGO_PATH } from '@core/constants';
import { PATH as HOME_PATH } from '@home/home.routing';
interface IOption {
  path: string;
  label: string;
  icon: string;
  selected: boolean;
}
@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  openedSidebar: boolean = true;
  profilePic = LOGO_PATH;
  options: Array<IOption> = [
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.CASH_FLOW}`,
      label: 'CORE.MENU.CASH_FLOW',
      icon: 'fa-landmark',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.DASHBOARD}`,
      label: 'CORE.MENU.DASHBOARD',
      icon: 'fa-chart-column',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.INFO}`,
      label: 'CORE.MENU.INFO',
      icon: 'fa-newspaper',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.CONFIG}`,
      label: 'CORE.MENU.CONFIG',
      icon: 'fa-circle-user',
      selected: false
    }
  ];

  constructor(
    @Inject(RouterService) private router: RouterService,
    @Inject(AuthService) private auth: AuthService
  ) {
    const profilePic = this.auth.getProfilePicture();
    if (profilePic) {
      this.profilePic = profilePic;
    }
  }

  ngOnInit() {
    this.options.forEach(_option => {
      if (this.router.getURL().includes(_option.path)) {
        _option.selected = true;
      }
    });
  }

  onSelect(option: IOption) {
    if (!option) {
      return;
    }

    this.options.forEach(_option => {
      _option.selected = false;
    });

    option.selected = true;
    this.goTo(option.path);
  }

  goTo(path: string) {
    this.router.goTo({ path });
  }
}
