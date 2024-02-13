import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  User,
  getAuth,
  indexedDBLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH: Auth | null = null;
  private _user: User | null = null;
  #signedIn = new BehaviorSubject<boolean>(false);

  get signedIn$(): Observable<boolean> {
    return this.#signedIn.asObservable();
  }

  start(app: FirebaseApp) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.AUTH = getAuth(app);
        await setPersistence(this.AUTH!, indexedDBLocalPersistence);
        this._user = this.AUTH.currentUser;
        this.#signedIn.next(Boolean(this.AUTH.currentUser));
        if (!this._user) {
          await setPersistence(this.AUTH!, indexedDBLocalPersistence);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  signIn(credentials: { email: string; password: string }) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          this.AUTH!,
          credentials.email,
          credentials.password
        );
        this._user = userCredential.user;
        this.#signedIn.next(true);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getEmail(): string | null {
    if (this._user && this._user.providerData[0]) {
      return this._user.providerData[0].email;
    }

    return null;
  }

  getId(): string | null {
    if (this._user && this._user.providerData[0]) {
      return this._user.providerData[0].uid;
    }

    return null;
  }

  signOut() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await signOut(this.AUTH!);
        this._user = null;
        this.#signedIn.next(false);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
