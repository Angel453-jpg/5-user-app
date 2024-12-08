import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import Swal from 'sweetalert2';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SharingDataService} from '../services/sharing-data.service';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {remove} from '../store/users-actions';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [
    RouterOutlet, NavbarComponent
  ],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  constructor(
    private store: Store<{ users: any }>,
    private service: UserService, private sharingData: SharingDataService, private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.removeUser();
    this.handlerLogin();
  }

  handlerLogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) => {
      console.log(username + ' y ' + password);
      this.authService.loginUser({username, password}).subscribe({

        next: response => {

          const token = response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);
          const user = {username: payload.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
        },

        error: error => {

          if (error.status === 401) {
            Swal.fire(
              'Error en el Login',
              error.error.message,
              'error'
            );
          } else {
            throw error;
          }

        }
      });
    })
  }

  removeUser() {

    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que deseas eliminar el usuario?",
        text: "Cuidado el usuario sera eliminado del sistema !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí!",
        cancelButtonText: "Cancelar!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.store.dispatch(remove({id}));
            this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
              this.router.navigate(['/users']);
            });
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con éxito.",
            icon: "success"
          });
        }
      });
    });
  }

}
