import {createReducer, on} from '@ngrx/store';
import {Users} from '../models/users';
import {add, find, findAll, remove, setPaginator, update} from './users-actions';

const users: Users[] = [];
const user: Users = new Users();

export const usersReducer = createReducer(
  {
    users,
    paginator: {},
    user,
  },
  on(findAll, (state, {users}) => ({
      users: [...users],
      paginator: state.paginator,
      user: state.user,
    }
  )),
  on(find, (state, {id}) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.users.find(user => user.id == id) || new Users()
  })),
  on(setPaginator, (state, {paginator}) => ({
    users: state.users,
    paginator: {...paginator},
    user: state.user
  })),
  on(add, (state, {userNew}) => ({
    users: [...state.users, {...userNew}],
    paginator: state.paginator,
    user: state.user
  })),
  on(update, (state, {userUpdated}) => ({
    users: state.users.map(u => (u.id == userUpdated.id) ? {...userUpdated} : u),
    paginator: state.paginator,
    user: state.user
  })),
  on(remove, (state, {id}) => ({
    users: state.users.filter(user => user.id != id),
    paginator: state.paginator,
    user: state.user
  }))
);
