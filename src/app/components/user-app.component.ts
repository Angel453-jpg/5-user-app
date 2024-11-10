import {Component, OnInit} from '@angular/core';
import {Users} from '../models/users';
import {UserService} from '../services/user.service';
import {UserComponent} from './user/user.component';
import {UserFormComponent} from './user-form/user-form.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios';

  users: Users[] = [];

  userSelected: Users;

  constructor(private service: UserService) {
    this.userSelected = new Users();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: Users) {
    this.users = [...this.users, {...user, id: new Date().getTime()}];
  }

  removeUser(id: number) {
    this.users = this.users.filter(user => user.id != id);
  }

  setSelectedUser(userRow: Users): void {
    this.userSelected = {...userRow};
  }

}
