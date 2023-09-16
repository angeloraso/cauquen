import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardRoutingModule.COMPONENTS]
})
export class DashboardModule {}
