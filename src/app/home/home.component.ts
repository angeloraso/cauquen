import { Component, Inject, OnInit } from '@angular/core';
import { PATH as APP_PATH } from '@app/app.routing';
import { RouterService } from '@bizy/services';
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
  toolbarTitle: string = '';
  options: Array<IOption> = [
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.HISTORY}`,
      label: 'CORE.MENU.HISTORY',
      icon: 'history',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.DASHBOARD}`,
      label: 'CORE.MENU.DASHBOARD',
      icon: 'dashboard',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.INFLATION}`,
      label: 'CORE.MENU.INFLATION',
      icon: 'trending_up',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.FIXED_RATE}`,
      label: 'CORE.MENU.FIXED_RATE',
      icon: 'account_balance',
      selected: false
    },
    {
      path: `/${APP_PATH.HOME}/${HOME_PATH.CONFIG}`,
      label: 'CORE.MENU.CONFIG',
      icon: 'settings',
      selected: false
    }
  ];

  constructor(@Inject(RouterService) private router: RouterService) {}

  ngOnInit() {
    this.options.forEach(_option => {
      if (this.router.getURL().includes(_option.path)) {
        _option.selected = true;
        this.toolbarTitle = _option.label;
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
    this.toolbarTitle = option.label;

    this.goTo(option.path);
  }

  goTo(path: string) {
    this.router.goTo({ path });
  }
}
