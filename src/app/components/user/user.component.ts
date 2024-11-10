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

  onRemoveUser(id: number): void {
    const confirmRemove = confirm('Estas seguro que desea eliminar?')
    if (confirmRemove) {
      this.idUserEventEmitter.emit(id);
    }
  }

}
