import { Component, Inject, OnDestroy } from '@angular/core';
import { PATH as APP_PATH } from '@app/app.routing';
import { BizyRouterService, BizyStorageService } from '@bizy/services';
import { AuthService } from '@core/auth/auth.service';
import { LOGO_PATH } from '@core/constants';
import { PATH as HOME_PATH } from '@home/home.routing';
import { Subscription } from 'rxjs';
interface IOption {
  icon: string;
  label: string;
  path: string;
  selected: boolean;
}
@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnDestroy {
  closedSidebar: boolean = false;
  profilePic;
  email: string = '';
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
      icon: 'fa-cogs',
      selected: false
    }
  ];

  #subscription = new Subscription();
  readonly #CLOSED_SIDEBAR = 'CLOSED_SIDEBAR';
  readonly LOGO_PATH = LOGO_PATH;

  constructor(
    @Inject(BizyRouterService) private router: BizyRouterService,
    @Inject(BizyStorageService) private storage: BizyStorageService,
    @Inject(AuthService) private auth: AuthService
  ) {
    this.closedSidebar = this.storage.get<boolean>(this.#CLOSED_SIDEBAR) ?? true;
    const profilePic = this.auth.getProfilePicture();
    if (profilePic) {
      this.profilePic = profilePic;
    }

    const email = this.auth.getEmail();
    if (email) {
      this.email = email;
    }

    this.#subscription.add(
      this.router.transitionsEnd$.subscribe(() => {
        const option = this.#getURLOption(this.options, this.router.getURL());
        if (option) {
          option.selected = true;
          this.onSelect(option);
        }
      })
    );
  }

  onSelect(option: IOption) {
    if (!option) {
      return;
    }

    if (option.path) {
      this.goTo(option.path);
    }
  }

  onToggle() {
    this.storage.set(this.#CLOSED_SIDEBAR, this.closedSidebar);
  }

  goTo(path: string) {
    this.router.goTo({ path });
  }

  #getURLOption = (options: Array<IOption>, path: string): IOption | null => {
    let urlOption: IOption | null = null;
    options.forEach(_option => {
      if (_option && _option.path === path) {
        urlOption = _option;
        return;
      }
    });

    return urlOption;
  };

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
