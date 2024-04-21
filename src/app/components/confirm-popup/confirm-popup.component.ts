import { Component, Inject } from '@angular/core';
import { BizyPopupService } from '@bizy/services';

@Component({
  selector: 'cauquen-confirm-popup',
  templateUrl: 'confirm-popup.html',
  styleUrls: ['confirm-popup.css']
})
export class ConfirmPopupComponent {
  _title: string = '';
  _msg: string = '';

  constructor(@Inject(BizyPopupService) private popup: BizyPopupService) {
    const data = this.popup.getData<{ title: string; msg: string }>();

    if (data && data.title) {
      this._title = data.title;
    }

    if (data && data.msg) {
      this._msg = data.msg;
    }
  }

  cancel() {
    this.popup.close({ response: false });
  }

  confirm() {
    this.popup.close({ response: true });
  }
}
