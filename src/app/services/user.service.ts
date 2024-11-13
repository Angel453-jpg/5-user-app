import {Injectable} from '@angular/core';
import {Users} from '../models/users';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }

  findById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  create(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, user);
  }

  update(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.url}/${user.id}`, user);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
