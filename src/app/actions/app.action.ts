import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/locations';
import { ActionTypes } from './action-type';
import { ModalType } from './modal.actions';

export class SetPageName implements Action {
  readonly type = ActionTypes.SetPageName;
  constructor(public payload: string) { }
}

export type AppType = SetPageName;
