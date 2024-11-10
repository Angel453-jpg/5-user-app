import {Component, OnInit} from '@angular/core';
import {Users} from '../models/users';
import {UserService} from '../services/user.service';
import Swal from 'sweetalert2';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

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

  users: Users[] = [];

  userSelected: Users;

  constructor(private service: UserService) {
    this.userSelected = new Users();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: Users) {
    if (user.id > 0) {
      this.users = this.users.map(u => (u.id == user.id) ? {...user} : u);
    } else {
      this.users = [...this.users, {...user, id: new Date().getTime()}];
    }

    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con éxito!",
      icon: "success"
    });

    this.userSelected = new Users();
  }

  removeUser(id: number) {

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

        this.users = this.users.filter(user => user.id != id);

        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con éxito.",
          icon: "success"
        });
      }
    });

  }

  setSelectedUser(userRow: Users): void {
    this.userSelected = {...userRow};
  }

}
