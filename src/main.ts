import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiu5Z9f3R_18o8g3KMiMKl6qtRYVjj_TI',
  authDomain: 'cauquen-7f101.firebaseapp.com',
  projectId: 'cauquen-7f101',
  storageBucket: 'cauquen-7f101.appspot.com',
  messagingSenderId: '1094121137684',
  appId: '1:1094121137684:web:c1d1ed7b2597414f9ce901'
};

// Initialize Firebase
initializeApp(firebaseConfig);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
