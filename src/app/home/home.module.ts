import { NgModule } from '@angular/core';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { HistoryModule } from '@app/history/history.module';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [SharedModule, HomeRoutingModule, DashboardModule, HistoryModule],
  declarations: [HomeRoutingModule.COMPONENTS]
})
export class HomeModule {}
