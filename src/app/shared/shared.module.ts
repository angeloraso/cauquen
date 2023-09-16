import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from './angularMaterial.module';

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, AngularMaterialModule, TranslateModule]
})
export class SharedModule {}
