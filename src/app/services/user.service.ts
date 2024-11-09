import {Injectable} from '@angular/core';
import {Users} from '../models/users';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Users[] = [{
    id: 1,
    name: 'Angel',
    lastName: 'González',
    email: 'angelin09ozoz@gmail.com',
    username: 'gabo',
    password: '123456'
  },
    {
      id: 2,
      name: 'Rafael',
      lastName: 'González',
      email: 'rafael@gmail.com',
      username: 'rafa',
      password: '123456'
    }
  ];

  constructor() {
  }

  findAll(): Observable<Users[]> {
    return of(this.users);
  }

}
