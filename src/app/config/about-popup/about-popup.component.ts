import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { SharedModules } from '@app/shared';
import { BizyDeviceService, BizyLogService, BizyPopupService } from '@bizy/core';
import pkg from '../../../../package.json';

@Component({
  selector: 'caquen-about-popup',
  templateUrl: 'about-popup.html',
  styleUrls: ['about-popup.css'],
  imports: SharedModules
})
export class AboutPopupComponent implements AfterViewInit {
  readonly #popup = inject(BizyPopupService);
  readonly #log = inject(BizyLogService);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #device = inject(BizyDeviceService);

  readonly DESCRIPTION: string = pkg.description;
  readonly VERSION: string = pkg.version;
  USER_AGENT: string = '';
  loading: boolean = true;

  async ngAfterViewInit() {
    try {
      this.loading = true;
      this.USER_AGENT = await this.#device.getUserAgent();
    } catch (error) {
      this.#log.error({
        fileName: 'about-popup.component',
        functionName: 'ngOnInit',
        param: error
      });
      this.close();
    } finally {
      this.loading = false;
      this.#ref.detectChanges();
    }
  }

  close() {
    this.#popup.close();
  }
}
