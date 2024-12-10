import {Component} from '@angular/core';
import {Users} from '../../models/users';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {login} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  user: Users;

  constructor(private store: Store<{ auth: any }>) {
    this.user = new Users();
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {

      Swal.fire(
        "Error de validación",
        "username y password requeridos!",
        "error"
      );

    } else {
      this.store.dispatch(login({username: this.user.username, password: this.user.password}));
    }
  }
}
