import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { ENV } from '@env/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  #backButton = new Subject<void>();

  get backButton$(): Observable<void> {
    return this.#backButton.asObservable();
  }

  isMobile = () => ENV.mobile;

  init = async () => {
    App.addListener('backButton', () => {
      this.#backButton.next();
    });

    await StatusBar.setBackgroundColor({ color: '#666666' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  };

  hideSplash = () => SplashScreen.hide();

  exit = () => App.exitApp();
}
