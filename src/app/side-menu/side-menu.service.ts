import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMenuOption } from './model';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private _open = new BehaviorSubject<boolean>(false);
  private _option = new Subject<IMenuOption>();

  get open$() {
    return this._open.asObservable();
  }

  setOpen(isOpen: boolean) {
    this._open.next(isOpen);
  }

  get option$() {
    return this._option.asObservable();
  }

  setOption(option: IMenuOption) {
    this._option.next(option);
  }
}
