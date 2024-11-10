import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Users} from '../../models/users';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

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
