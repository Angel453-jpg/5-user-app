import {createReducer, on} from '@ngrx/store';
import {Users} from '../models/users';
import {
  addSuccess,
  find,
  findAll,
  findAllPageable,
  load,
  remove,
  setErrors,
  setPaginator,
  update
} from './users-actions';

const users: Users[] = [];
const user: Users = new Users();

export const usersReducer = createReducer(
  {
    users,
    paginator: {},
    user,
    errors: {}
  },
  on(load, (state, {page}) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(findAll, (state, {users}) => ({
      users: [...users],
      paginator: state.paginator,
      user: state.user,
      errors: state.errors,
    }
  )),
  on(findAllPageable, (state, {users, paginator}) => ({
      users: [...users],
      paginator: {...paginator},
      user: state.user,
      errors: state.errors,
    }
  )),
  on(find, (state, {id}) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.users.find(user => user.id == id) || new Users(),
    errors: state.errors,
  })),
  on(setPaginator, (state, {paginator}) => ({
    users: state.users,
    paginator: {...paginator},
    user: state.user,
    errors: state.errors,
  })),
  on(addSuccess, (state, {userNew}) => ({
    users: [...state.users, {...userNew}],
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(update, (state, {userUpdated}) => ({
    users: state.users.map(u => (u.id == userUpdated.id) ? {...userUpdated} : u),
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(remove, (state, {id}) => ({
    users: state.users.filter(user => user.id != id),
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(setErrors, (state, {errors}) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.user,
    errors: {...errors}
  }))
);
