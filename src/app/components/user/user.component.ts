import {Component, OnInit} from '@angular/core';
import {Users} from '../../models/users';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
export class UserComponent implements OnInit {

  title: string = 'Listado de usuarios!';

  users: Users[] = [];

  constructor(private router: Router, private service: UserService, private sharingData: SharingDataService, private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {

    if (this.users == undefined || this.users.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as Users[]);

      })
    }

  }


  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: Users): void {
    this.router.navigate(['/users/edit', user.id]);
  }

}
