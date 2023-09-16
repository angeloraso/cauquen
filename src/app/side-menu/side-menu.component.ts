import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MENU_OPTIONS, MENU_OPTION_ID } from '@core/constants';
import { RouterService } from '@core/services';
import { PATH as HOME_PATH } from '@home/home.routing';
import { Subscription } from 'rxjs';
import { IMenuOption } from './model';
import { SideMenuService } from './side-menu.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  options: Array<IMenuOption> = [];
  private subscription = new Subscription();
  opened: boolean = false;

  paths = new Map<MENU_OPTION_ID, string>([
    [MENU_OPTION_ID.DASHBOARD, HOME_PATH.DASHBOARD],
    [MENU_OPTION_ID.HISTORY, HOME_PATH.HISTORY]
  ]);

  constructor(
    @Inject(SideMenuService) private sideMenu: SideMenuService,
    @Inject(RouterService) private router: RouterService
  ) {}

  ngOnInit() {
    const url = this.router.getURL();
    MENU_OPTIONS.forEach(_option => {
      _option.active = url.indexOf(this.paths.get(_option.id)!) !== -1;
      this.options.push(_option);
    });
  }

  showOption(option: IMenuOption) {
    this.options.forEach(option => {
      option.active = false;
    });
    option.active = true;

    this.sideMenu.setOption(option);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
