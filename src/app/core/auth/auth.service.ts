import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  GoogleAuthProvider,
  User,
  getAuth,
  indexedDBLocalPersistence,
  setPersistence,
  signOut
} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #AUTH: Auth | null = null;
  #AUTH_UI: firebaseui.auth.AuthUI | null = null;
  #USER: User | null = null;
  #signedIn = new BehaviorSubject<boolean>(false);

  get signedIn$(): Observable<boolean> {
    return this.#signedIn.asObservable();
  }

  start(app: FirebaseApp) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.#AUTH = getAuth(app);
        await setPersistence(this.#AUTH!, indexedDBLocalPersistence);
        this.#AUTH.onAuthStateChanged(async state => {
          this.#USER = state;
          const signedIn = Boolean(state);
          if (signedIn !== this.#signedIn.value) {
            await setPersistence(this.#AUTH!, indexedDBLocalPersistence);
          }

          this.#signedIn.next(signedIn);
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  signIn() {
    if (!this.#AUTH_UI) {
      return;
    }

    this.#AUTH_UI.signIn();
  }

  getEmail(): string | null {
    if (this.#USER && this.#USER.providerData[0]) {
      return this.#USER.providerData[0].email;
    }

    return null;
  }

  getId(): string | null {
    if (this.#USER && this.#USER.providerData[0]) {
      return this.#USER.providerData[0].uid;
    }

    return null;
  }

  getProfilePicture(): string | null {
    if (this.#USER && this.#USER.providerData[0]) {
      return this.#USER.providerData[0].photoURL;
    }

    return null;
  }

  signOut() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await signOut(this.#AUTH!);
        this.#USER = null;
        this.#signedIn.next(false);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  startUI = (uiContainer: Element) => {
    return new Promise<void>(resolve => {
      this.#AUTH_UI = new firebaseui.auth.AuthUI(this.#AUTH);
      this.#AUTH_UI.start(uiContainer, {
        signInOptions: [GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          uiShown: resolve,
          signInSuccessWithAuthResult: () => false
        }
      });
    });
  };
}
