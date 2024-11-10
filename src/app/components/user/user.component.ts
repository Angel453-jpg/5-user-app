import {Component} from '@angular/core';
import {Users} from '../../models/users';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SharingDataService} from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user.component.html'
})
export class UserComponent {

  title: string = 'Listado de usuarios!';

  users: Users[] = [];

  constructor(private router: Router, private service: UserService, private sharingData: SharingDataService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }


  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: Users): void {
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }

}
