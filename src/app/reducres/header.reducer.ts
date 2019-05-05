import { ActionTypes } from "../actions/action-type";
import * as HeaderActions from '../actions/header.actions';
import { LocationState, HeaderState } from "../states/state";

const initialState: HeaderState = {
  editEnabled: true,
  addEnabled: true,
  removeEnables: true
};

export function headerReducer(state: HeaderState = initialState, action: HeaderActions.HeaderType): any {
  switch (action.type) {
    case ActionTypes.DisableHeaderEdit:
      return { ...state, editEnabled: false };
    case ActionTypes.DisableHeaderAdd:
      return { ...state, addEnabled: false };
    case ActionTypes.DisableHeaderRemove:
      return { ...state, removeEnables: false };
    case ActionTypes.EnableHeaderEdit:
      return { ...state, editEnabled: true };
    case ActionTypes.EnableHeaderAdd:
      return { ...state, addEnabled: true };
    case ActionTypes.EnableHeaderRemove:
      return { ...state, removeEnables: true };
    default:
      return state;
  }
}
