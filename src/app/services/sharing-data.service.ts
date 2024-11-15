import {EventEmitter, Injectable} from '@angular/core';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<Users> = new EventEmitter();
  private _idUserEventEmitter = new EventEmitter();
  private _findUserByIdEventEmitter = new EventEmitter();
  private _selectUserEventEmitter = new EventEmitter();
  private _errorsUserFormEventEmitter = new EventEmitter();


  constructor() {
  }


  get newUserEventEmitter(): EventEmitter<Users> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter(): EventEmitter<any> {
    return this._findUserByIdEventEmitter;
  }

  get selectUserEventEmitter(): EventEmitter<any> {
    return this._selectUserEventEmitter;
  }

  get errorsUserFormEventEmitter(): EventEmitter<any> {
    return this._errorsUserFormEventEmitter;
  }
}
