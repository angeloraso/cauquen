import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LogService, PopupService, UserAgentService } from '@bizy/services';
import pkg from '../../../../package.json';

@Component({
  selector: 'caquen-about-popup',
  templateUrl: 'about-popup.html',
  styleUrls: ['about-popup.css']
})
export class AboutPopupComponent implements AfterViewInit {
  readonly DESCRIPTION: string = pkg.description;
  readonly VERSION: string = pkg.version;
  USER_AGENT: string = '';
  loading: boolean = true;

  constructor(
    @Inject(UserAgentService) public userAgent: UserAgentService,
    @Inject(LogService) private log: LogService,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(PopupService) private popup: PopupService
  ) {}

  async ngAfterViewInit() {
    try {
      this.loading = true;
      this.USER_AGENT = await this.userAgent.get();
    } catch (error) {
      this.log.error({
        fileName: 'about-popup.component',
        functionName: 'ngOnInit',
        param: error
      });
    } finally {
      this.loading = false;
      this.ref.detectChanges();
    }
  }

  close() {
    this.popup.close();
  }
}
