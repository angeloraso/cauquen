import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PopupService, RouterService } from '@bizy/services';
import { ConfirmPopupComponent } from '@components/confirm-popup';
import { IHistoryRecord } from '@core/model';
import { HistoryService } from '@core/services';
import { Subscription } from 'rxjs';
import { PATH } from './history.routing';

@Component({
  selector: 'cauquen-history',
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  records: Array<IHistoryRecord> = [];
  loading = false;
  orderBy: string = 'date';
  order: 'asc' | 'desc' | null = 'desc';

  private _subscription = new Subscription();

  constructor(
    @Inject(PopupService) private popup: PopupService<ConfirmPopupComponent, boolean>,
    @Inject(RouterService) private router: RouterService,
    @Inject(HistoryService) private history: HistoryService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const data = await this.history.getRecords();
      this.records = data ?? [];
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  addRecord() {
    this.router.goTo({ path: PATH.ADD });
  }

  editRecord(record: IHistoryRecord) {
    console.log(record);
    this.router.goTo({ path: String(record.id) });
  }

  onSort(property: string) {
    this.orderBy = property;
    this.order = this.order === 'asc' ? 'desc' : this.order === 'desc' ? null : 'asc';
  }

  openConfirmPopup(record: IHistoryRecord) {
    this.popup.open({
      component: ConfirmPopupComponent,
      data: record
    });

    this._subscription.add(
      this.popup.closed$.subscribe((res: boolean) => {
        if (res) {
          this.#deleteRecord(record);
        }
      })
    );
  }

  async #deleteRecord(record: IHistoryRecord) {
    try {
      await this.history.deleteRecord(record);
      const index = this.records.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.records.splice(index, 1);
        this.records = [...this.records];
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
