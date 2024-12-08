import {Component, OnInit} from '@angular/core';
import {Users} from '../../models/users';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SharingDataService} from '../../services/sharing-data.service';
import {PaginatorComponent} from '../paginator/paginator.component';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';
import {load} from '../../store/users-actions';

@Component({
  selector: 'user',
  standalone: true,
  imports: [
    RouterLink, PaginatorComponent
  ],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  title: string = 'Listado de usuarios!';

  users: Users[] = [];

  paginator: any = {};

  constructor(
    private store: Store<{ users: any }>,
    private authService: AuthService,
    private sharingData: SharingDataService, private route: ActivatedRoute, private router: Router) {

    this.store.select('users').subscribe(state => {
      this.users = state.users;
      this.paginator = state.paginator;
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(load({page: +(params.get('page') || '0')})))
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: Users): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }

}
