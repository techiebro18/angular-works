import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
  add = '[App] Add App settings',
}

export const add = createAction(AppActionTypes.add, props<any>());
