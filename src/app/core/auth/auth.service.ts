import { Inject, Injectable } from '@angular/core';
import { FirebaseAuthentication, Persistence, User } from '@capacitor-firebase/authentication';
import { MobileService } from '@core/services';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #USER: User | null = null;
  #signedIn = new BehaviorSubject<boolean>(false);

  get signedIn$(): Observable<boolean> {
    return this.#signedIn.asObservable().pipe(distinctUntilChanged());
  }

  constructor(@Inject(MobileService) private mobile: MobileService) {}

  start() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (!this.mobile.isMobile()) {
          await FirebaseAuthentication.setPersistence({
            persistence: Persistence.IndexedDbLocal
          });
          const result = await FirebaseAuthentication.getRedirectResult();
          if (result && result.user) {
            this.#USER = result.user;
            this.#signedIn.next(Boolean(this.#USER));
            await FirebaseAuthentication.setPersistence({
              persistence: Persistence.IndexedDbLocal
            });
          }
        } else {
          console.log('AUTH: GET CURRENT USER');
          const res = await FirebaseAuthentication.getCurrentUser();
          this.#USER = res.user;
          if (res.user) {
            console.log('AUTH: CURRENT USER:', res.user.displayName);
            this.#signedIn.next(true);
          }
        }

        console.log('AUTH: Remove all listeners');
        await FirebaseAuthentication.removeAllListeners();
        console.log('AUTH: Listen changes');
        FirebaseAuthentication.addListener('authStateChange', async change => {
          console.log('AUTH: New change!', change);
          console.log('AUTH: User?', change?.user?.displayName);
          this.#USER = change?.user ?? null;
          const signedIn = Boolean(this.#USER);
          console.log('AUTH: update sign in!', signedIn);
          this.#signedIn.next(signedIn);
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async signIn() {
    try {
      await FirebaseAuthentication.signInWithGoogle({
        mode: 'redirect'
      });
    } catch (error) {
      console.log(error);
    }
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
      return this.#USER.providerData[0].photoUrl;
    }

    return null;
  }

  signOut() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await FirebaseAuthentication.signOut();
        this.#USER = null;
        this.#signedIn.next(false);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
