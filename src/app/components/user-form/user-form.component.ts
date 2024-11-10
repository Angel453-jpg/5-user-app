import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Users} from '../../models/users';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  @Input() user: Users;

  @Output() newUserEventEmitter: EventEmitter<Users> = new EventEmitter();

  constructor() {
    this.user = new Users();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }

    userForm.reset();
    userForm.resetForm();

  }

  onClear(userForm: NgForm): void {
    userForm.reset();
  }

}
