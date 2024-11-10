import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Users} from '../../models/users';
import {SharingDataService} from '../../services/sharing-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: Users;

  constructor(private sharingData: SharingDataService, private route: ActivatedRoute) {
    this.user = new Users();
  }

  ngOnInit(): void {

    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }

    })
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
