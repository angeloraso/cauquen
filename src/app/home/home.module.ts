import { NgModule } from '@angular/core';
import { ConfigModule } from '@config/config.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { FixedRateModule } from '@fixed-rate/fixed-rate.module';
import { HistoryModule } from '@history/history.module';
import { InflationModule } from '@inflation/inflation.module';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    DashboardModule,
    HistoryModule,
    InflationModule,
    FixedRateModule,
    ConfigModule
  ],
  declarations: [HomeRoutingModule.COMPONENTS]
})
export class HomeModule {}
