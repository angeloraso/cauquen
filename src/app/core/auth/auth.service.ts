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
  #AUTH: Auth | null = null;
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
        this.#USER = this.#AUTH.currentUser;
        this.#signedIn.next(Boolean(this.#AUTH.currentUser));
        if (!this.#USER) {
          await setPersistence(this.#AUTH!, indexedDBLocalPersistence);
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
          this.#AUTH!,
          credentials.email,
          credentials.password
        );
        this.#USER = userCredential.user;
        this.#signedIn.next(true);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
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
}
