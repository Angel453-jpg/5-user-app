import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Users} from '../../models/users';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() users: Users[] = [];
  @Input() paginator = {};

  constructor(private authService: AuthService, private router: Router) {
  }

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }

  handlerLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
