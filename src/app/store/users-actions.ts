import {createAction, props} from '@ngrx/store';
import {Users} from '../models/users';

export const findAll = createAction('findAll', props<{ users: Users[] }>());
export const setPaginator = createAction('setPaginator', props<{ paginator: any }>());
export const find = createAction('find', props<{ id: number }>());

export const add = createAction('add', props<{ userNew: Users }>());
export const update = createAction('update', props<{ userUpdated: Users }>());
export const remove = createAction('remove', props<{ id: number }>());
