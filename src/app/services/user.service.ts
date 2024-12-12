import {Injectable} from '@angular/core';
import {Users} from '../models/users';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from '../components/config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = `${BACKEND_URL}/api/users`;

  constructor(private http: HttpClient) {
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/page/${page}`);
  }

  create(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, user);
  }

  update(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.url}/${user.id}`, user);
  }

  remove(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`).pipe(
      map(() => id)
    );
  }

}
