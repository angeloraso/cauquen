import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  exports: [MatIconModule, MatSidenavModule, MatListModule, MatTabsModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } // Change date picker format to dd/MM/yyyy
  ]
})
export class AngularMaterialModule {}
