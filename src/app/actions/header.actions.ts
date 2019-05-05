import { Action } from "@ngrx/store";
import { ActionTypes } from "./action-type";

export class DisableHeaderEdit implements Action {
  readonly type = ActionTypes.DisableHeaderEdit;
}

export class DisableHeaderAdd implements Action {
  readonly type = ActionTypes.DisableHeaderAdd;
}

export class DisableHeaderRemove implements Action {
  readonly type = ActionTypes.DisableHeaderRemove;
}

export class EnableHeaderEdit implements Action {
  readonly type = ActionTypes.EnableHeaderEdit;
}

export class EnableHeaderAdd implements Action {
  readonly type = ActionTypes.EnableHeaderAdd;
}

export class EnableHeaderRemove implements Action {
  readonly type = ActionTypes.EnableHeaderRemove;
}

export type HeaderType = DisableHeaderEdit | DisableHeaderAdd | DisableHeaderRemove
  | EnableHeaderEdit | EnableHeaderAdd | EnableHeaderRemove;
