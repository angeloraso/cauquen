import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupService, RouterService } from '@bizy/services';
import { ConfirmPopupComponent } from '@components/confirm-popup';
import { ICountryRecord } from '@core/model';
import { ArgentinaService } from '@core/services';
import { Subscription } from 'rxjs';
import { PATH } from './info.routing';

@Component({
  selector: 'cauquen-info',
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['from', 'to', 'ipc', 'fixedRate', 'actions'];
  dataSource = new MatTableDataSource<ICountryRecord>();

  private _subscription = new Subscription();

  constructor(
    @Inject(ArgentinaService) private argentina: ArgentinaService,
    @Inject(RouterService) private router: RouterService,
    @Inject(PopupService) private popup: PopupService<ConfirmPopupComponent, boolean>
  ) {}

  async ngOnInit() {
    try {
      const countryData = await this.argentina.getData();

      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.dataSource.sort.active = 'from';
        this.dataSource.sort.direction = 'desc';
      }
      this.dataSource.data = countryData;
    } catch (error) {
      console.debug(error);
    }
  }

  goToRecord(record: ICountryRecord): void {
    this.router.goTo({ path: record.id });
  }

  openConfirmPopup(record: ICountryRecord) {
    this.popup.open({
      component: ConfirmPopupComponent,
      data: record
    });

    this._subscription.add(
      this.popup.closed$.subscribe((res: boolean) => {
        if (res) {
          this._deleteRecord(record);
        }
      })
    );
  }

  addRecord() {
    this.router.goTo({ path: PATH.ADD });
  }

  private async _deleteRecord(record: ICountryRecord) {
    try {
      await this.argentina.deleteRecord(record);
      const index = this.dataSource.data.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
