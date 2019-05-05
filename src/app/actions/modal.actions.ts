import { Action } from '@ngrx/store';
import { ActionTypes } from './action-type';

export class OpenInfoModal implements Action {
  readonly type = ActionTypes.OpenInfoModal;
  constructor(public payload: { message: string }) { }
}

export class CloseInfoModal implements Action {
  readonly type = ActionTypes.CloseInfoModal;
}

export class OpenConfirmModal implements Action {
  readonly type = ActionTypes.OpenConfirmModal;
  constructor(public payload: { message: string, referer: string }) { }
}

export class ConfirmModalCancel implements Action {
  readonly type = ActionTypes.ConfirmModalCancel;
}

export class ConfirmModalConfirm implements Action {
  readonly type = ActionTypes.ConfirmModalConfirm;
}

export class CloseConfirmModal implements Action {
  readonly type = ActionTypes.CloseConfirmModal;
}
export type ModalType = OpenInfoModal | CloseInfoModal | ConfirmModalConfirm
  | ConfirmModalCancel | OpenConfirmModal | CloseConfirmModal;
