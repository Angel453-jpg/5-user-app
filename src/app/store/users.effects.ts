import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {
  add,
  addSuccess,
  findAllPageable,
  load,
  remove,
  removeSuccess,
  setErrors,
  update,
  updateSuccess
} from './users-actions';
import {catchError, EMPTY, exhaustMap, map, of, tap} from 'rxjs';
import {Users} from '../models/users';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()
export class UsersEffects {

  loadUsers$;

  addUser$;

  addSuccessUser$;

  updateUsers$;

  updateSuccessUser$;

  removeUser$;

  removeSuccessUser$;

  constructor(private actions$: Actions, private service: UserService, private router: Router) {

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

    this.addUser$ = createEffect(
      () => this.actions$.pipe(
        ofType(add),
        exhaustMap(action => this.service.create(action.userNew)
          .pipe(
            map(userUpdated => updateSuccess({userUpdated})),
            catchError(error => (error.status == 400) ? of(setErrors({errors: error.error})) : EMPTY
            )
          )
        )
      )
    );

    this.addSuccessUser$ = createEffect(() => this.actions$.pipe(
      ofType(addSuccess),
      tap(() => {
        this.router.navigate(['/users']);
        Swal.fire({
          title: "Creado nuevo usuario!",
          text: "Usuario creado con éxito!",
          icon: "success"
        });
      })
    ), {dispatch: false});

    this.updateUsers$ = createEffect(
      () => this.actions$.pipe(
        ofType(update),
        exhaustMap(action => this.service.update(action.userUpdated)
          .pipe(
            map(userUpdated => updateSuccess({userUpdated})),
            catchError(error => (error.status == 400) ? of(setErrors({errors: error.error})) : EMPTY
            )
          )
        )
      )
    );

    this.updateSuccessUser$ = createEffect(() => this.actions$.pipe(
      ofType(updateSuccess),
      tap(() => {
        this.router.navigate(['/users']);
        Swal.fire({
          title: "Actualizado!",
          text: "Usuario editado con éxito!",
          icon: "success"
        });
      })
    ), {dispatch: false});

    this.removeUser$ = createEffect(
      () => this.actions$.pipe(
        ofType(remove),
        exhaustMap(action => this.service.remove(action.id)
          .pipe(
            map(id => removeSuccess({id})),
            catchError(error => (error.status == 400) ? of(setErrors({errors: error.error})) : EMPTY
            )
          )
        )
      )
    );

    this.removeSuccessUser$ = createEffect(() => this.actions$.pipe(
      ofType(removeSuccess),
      tap(() => {
        this.router.navigate(['/users']);
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con éxito.",
          icon: "success"
        });
      })
    ), {dispatch: false});

  }

}
