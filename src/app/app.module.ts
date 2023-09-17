import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TranslateModule.forRoot(), CoreModule],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
