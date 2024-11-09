import {Component, Input} from '@angular/core';
import {Users} from '../../models/users';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  @Input() users: Users[] = [];

}
