import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LogService, UserAgentService } from '@bizy/services';
import pkg from '../../../../package.json';

@Component({
  selector: 'caquen-about-popup',
  templateUrl: 'about-popup.html',
  styleUrls: ['about-popup.css']
})
export class AboutPopupComponent implements OnInit {
  DESCRIPTION: string = '';
  VERSION: string = '';
  USER_AGENT: string = '';
  loading: boolean = false;

  constructor(
    @Inject(MatDialogRef) private dialog: MatDialogRef<AboutPopupComponent>,
    @Inject(UserAgentService) private userAgent: UserAgentService,
    @Inject(LogService) private log: LogService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      this.USER_AGENT = await this.userAgent.get();
      this.VERSION = pkg.version;
      this.DESCRIPTION = pkg.description;
    } catch (error) {
      this.log.error({
        fileName: 'about-popup.component',
        functionName: 'ngOnInit',
        param: error
      });
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.dialog.close();
  }
}
