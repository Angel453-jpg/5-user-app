import {Component, OnInit} from '@angular/core';
import {Users} from '../models/users';
import {UserService} from '../services/user.service';
import {UserComponent} from './user/user.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios';

  users: Users[] = [];

  constructor(private service: UserService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

}
