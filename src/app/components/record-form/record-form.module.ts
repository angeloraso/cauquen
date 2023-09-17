import { NgModule } from '@angular/core';
import { ConfirmFooterModule } from '@components/confirm-footer';
import { SharedModule } from '@shared/shared.module';
import { RecordFormComponent } from './record-form.component';

@NgModule({
  imports: [SharedModule, ConfirmFooterModule],
  declarations: [RecordFormComponent],
  exports: [RecordFormComponent]
})
export class RecordFormModule {}
