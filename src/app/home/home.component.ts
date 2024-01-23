import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PATH as APP_PATH } from '@app/app.routing';
import { RouterService } from '@bizy/services';
import { MENU_OPTIONS, MENU_OPTION_ID } from '@core/constants';
import { PATH as HOME_PATH } from '@home/home.routing';
import { IMenuOption } from '@menu/model';
import { PATH as SIDE_MENU_PATH } from '@menu/side-menu.routing';
import { SideMenuService } from '@menu/side-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  showBottomBar = true;
  sideMenuIsOpen: boolean = false;
  options: Array<IMenuOption> = [];
  selectedIndex: number = 0;

  paths = new Map<MENU_OPTION_ID, string>([
    [MENU_OPTION_ID.DASHBOARD, HOME_PATH.DASHBOARD],
    [MENU_OPTION_ID.HISTORY, HOME_PATH.HISTORY],
    [MENU_OPTION_ID.INFLATION, HOME_PATH.INFLATION],
    [MENU_OPTION_ID.FIXED_RATE, HOME_PATH.FIXED_RATE],
    [MENU_OPTION_ID.CONFIG, HOME_PATH.CONFIG]
  ]);

  constructor(
    @Inject(RouterService) private router: RouterService,
    @Inject(SideMenuService) private sideMenu: SideMenuService
  ) {}

  ngOnInit() {
    this.options = MENU_OPTIONS;

    this.selectedIndex = this.options.findIndex(
      _option => this.router.getURL().indexOf(this.paths.get(_option.id)!) !== -1
    );

    this.subscription.add(
      this.sideMenu.open$.subscribe(opened => {
        this.sideMenuIsOpen = opened;
      })
    );

    this.subscription.add(
      this.sideMenu.option$.subscribe(option => {
        this.selectedIndex = this.options.findIndex(_option => _option.id === option.id);
        this.goTo(option);
      })
    );
  }

  onSelect(option: IMenuOption) {
    if (this.sideMenuIsOpen) {
      return;
    }

    this.options.forEach(_option => {
      _option.active = false;
    });

    option.active = true;

    this.goTo(option);
  }

  goTo(option: IMenuOption) {
    this.router.goTo({
      path: `/${APP_PATH.MENU}/${SIDE_MENU_PATH.HOME}/${this.paths.get(option.id)}`
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
