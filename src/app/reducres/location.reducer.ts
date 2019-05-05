import { ActionTypes } from "../actions/action-type";
import * as LocationActions from '../actions/location.actions';
import { LocationState } from "../states/state";

const initialState: LocationState = {
  location: null,
  editable: false,
  pendingRemove: false,
  actionComplete: false,
  lastAction: '',
  pendingError: false,
  errorMessage: ''
};

export function locationReducer(state: LocationState = initialState, action: LocationActions.LocationType): any {
  switch (action.type) {
    case ActionTypes.NewLocationReady:
      return { ...state, location: action.payload, editable: true };
    case ActionTypes.LocationLoaded:
      return { ...state, location: action.payload, editable: false };
    case ActionTypes.LocationSaved:
      return {
        ...state,
        location: action.payload,
        editable: false,
        actionComplete: true, lastAction: 'save'
      };
    case ActionTypes.EnableLocationEdit:
      return { ...state, editable: true };
    case ActionTypes.DisableLocationEdit:
      return { ...state, editable: false };
    case ActionTypes.TriggerLocationRemove:
      return { ...state, pendingRemove: true };
    case ActionTypes.RemovingLocation:
      return { ...state, pendingRemove: false };
    case ActionTypes.LocationRemoved:
      return {
        ...state, pendingRemove: false,
        actionComplete: true, lastAction: 'remove'
      };
    case ActionTypes.LocationError:
      return { ...state, pendingError: true, errorMessage: action.payload };
    case ActionTypes.ClearLocationError:
      return { ...state, pendingError: false };
    case ActionTypes.ClearLocationAction:
      return { ...state, actionComplete: false, lastAction: '' };
    default:
      return state;
  }
}
