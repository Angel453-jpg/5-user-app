import {Injectable} from '@angular/core';
import {Users} from '../models/users';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Users[] = [];

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Users[]> {
    // return of(this.users);
    return this.http.get<Users[]>('http://localhost:8080/api/users');
  }

}
