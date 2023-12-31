import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cauquen-confirm-footer',
  templateUrl: 'confirm-footer.html',
  styleUrls: ['confirm-footer.css']
})
export class ConfirmFooterComponent {
  @Input() cancelText = 'CORE.BUTTON.CANCEL';
  @Input() confirmText = 'CORE.BUTTON.SAVE';
  @Input() icon = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
