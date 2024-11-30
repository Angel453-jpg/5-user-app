import { Component } from '@angular/core';
import {Users} from '../../models/users';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';

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

  constructor() {
    this.user = new Users();
  }

  onSubmit(){
    if (!this.user.username || !this.user.password) {

      Swal.fire(
        "Error de validación",
        "username y password requeridos!",
        "error"
      );

    } else {
      console.log(this.user);
    }

  }

}
