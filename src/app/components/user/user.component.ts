import {Component, EventEmitter} from '@angular/core';
import {Users} from '../../models/users';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user.component.html'
})
export class UserComponent {

  title: string = 'Listado de usuarios!';

  users: Users[] = [];

  idUserEventEmitter = new EventEmitter();

  selectedUserEventEmitter = new EventEmitter();

  constructor(private router: Router) {
    this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
  }


  onRemoveUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: Users): void {
    this.selectedUserEventEmitter.emit(user);
  }

}
