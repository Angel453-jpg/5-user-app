import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {findAllPageable, load} from './users-actions';
import {catchError, EMPTY, exhaustMap, map} from 'rxjs';
import {Users} from '../models/users';

@Injectable()
export class UsersEffects {

  loadUsers$;

  constructor(private actions$: Actions, private service: UserService) {
    this.loadUsers$ = createEffect(
      () => this.actions$.pipe(
        ofType(load),
        exhaustMap(action => this.service.findAllPageable(action.page)
          .pipe(map(pageable => {
              const users = pageable.content as Users[];
              const paginator = pageable;
              return findAllPageable({users, paginator})
            }),
            catchError(() => EMPTY)
          )
        )
      )
    );
  }

}
