import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Users} from '../../models/users';
import {RouterLink} from '@angular/router';

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

  @Input() users: Users[] = [];

  @Output() idUserEventEmitter = new EventEmitter();

  @Output() selectedUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: Users): void {
    this.selectedUserEventEmitter.emit(user);
  }

}
