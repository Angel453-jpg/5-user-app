import {AuthService} from '../../services/auth.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {login, loginError, loginSuccess} from './auth.actions';
import {catchError, exhaustMap, map, of, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class AuthEffects {

  login$;
  loginSuccess$;
  loginError$;

  constructor(private service: AuthService, private actions$: Actions, private router: Router) {

    this.login$ = createEffect(() => this.actions$.pipe(
      ofType(login),
      exhaustMap(action => this.service.loginUser({username: action.username, password: action.password})
        .pipe(
          map(response => {
            const token = response.token;
            const payload = this.service.getPayload(token);

            const loginData = {
              user: {username: payload.sub},
              isAuth: true,
              isAdmin: payload.isAdmin
            };

            this.service.token = token;
            this.service.user = loginData;
            return loginSuccess({login: loginData});

          }),
          catchError((error) => of(loginError({error: error.error.message})))
        ))
    ));

    this.loginSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['/users']);
      })
    ), {dispatch: false});

    this.loginError$ = createEffect(() => this.actions$.pipe(
      ofType(loginError),
      tap((action) => {
        Swal.fire(
          'Error en el Login',
          action.error,
          'error'
        );
      })
    ), {dispatch: false});

  }

}
