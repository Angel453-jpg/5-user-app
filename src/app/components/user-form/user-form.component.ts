import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Users} from '../../models/users';
import {SharingDataService} from '../../services/sharing-data.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Store} from '@ngrx/store';
import {add} from '../../store/users-actions';

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
  errors: any = {};

  constructor(private sharingData: SharingDataService, private store: Store<{ users: any }>,
              private route: ActivatedRoute,
              private service: UserService) {
    this.user = new Users();

    this.store.select('users').subscribe(state => {
      this.errors = state.errors;
      this.user = {...state.user};
    })

  }

  ngOnInit(): void {

    // this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);
    // this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    this.store.dispatch(add({userNew: this.user}));
  }

  onClear(userForm: NgForm): void {
    userForm.reset();
  }

}
