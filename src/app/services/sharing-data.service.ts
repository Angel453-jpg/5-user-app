import {EventEmitter, Injectable} from '@angular/core';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<Users> = new EventEmitter();
  private _idUserEventEmitter = new EventEmitter();


  constructor() {
  }


  get newUserEventEmitter(): EventEmitter<Users> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

}
