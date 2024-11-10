import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Users} from '../../models/users';
import {SharingDataService} from '../../services/sharing-data.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  user: Users;

  constructor(private sharingData: SharingDataService) {
    this.user = new Users();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }

    userForm.reset();
    userForm.resetForm();

  }

  onClear(userForm: NgForm): void {
    userForm.reset();
  }

}
