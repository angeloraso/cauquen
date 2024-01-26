import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angularMaterial.module';
import { BizyModule } from './bizy.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    PipesModule,
    ComponentsModule,
    BizyModule
  ]
})
export class SharedModule {}
