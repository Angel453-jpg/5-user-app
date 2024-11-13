import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Users} from '../../models/users';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

}
