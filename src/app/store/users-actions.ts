import {createAction, props} from '@ngrx/store';
import {Users} from '../models/users';

export const load = createAction('load', props<{ page: number }>());

export const resetUser = createAction('resetUser');
export const setUserForm = createAction('setUserForm', props<{ user: Users }>());
export const findAll = createAction('findAll', props<{ users: Users[] }>());
export const findAllPageable = createAction('findAllPageable', props<{ users: Users[], paginator: any }>());
export const setPaginator = createAction('setPaginator', props<{ paginator: any }>());
export const find = createAction('find', props<{ id: number }>());

export const add = createAction('add', props<{ userNew: Users }>());
export const addSuccess = createAction('addSuccess', props<{ userNew: Users }>());
export const update = createAction('update', props<{ userUpdated: Users }>());
export const updateSuccess = createAction('updateSuccess', props<{ userUpdated: Users }>());
export const remove = createAction('remove', props<{ id: number }>());
export const setErrors = createAction('setErrors', props<{ errors: any }>());
