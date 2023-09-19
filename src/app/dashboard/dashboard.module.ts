import { NgModule } from '@angular/core';
import { LineChartModule } from '@components/line-chart';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, LineChartModule],
  declarations: [DashboardRoutingModule.COMPONENTS],
  exports: [DashboardRoutingModule.COMPONENTS]
})
export class DashboardModule {}
