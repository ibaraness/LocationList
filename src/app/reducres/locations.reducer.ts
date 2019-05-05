import { ActionTypes } from "../actions/action-type";
import { sortObject } from "../shared/utils/array";
import { LocationsState } from "../states/state";
import * as LocationsActions from './../actions/locations.actions';

const initialState: LocationsState = {
  locations: [],
  sortingKey: '',
  sortAccending: false
}

export function locationsReducer(state: LocationsState = initialState, action: LocationsActions.LocationsType): any {
  switch (action.type) {
    case ActionTypes.LocationsLoaded:
      return { ...state, locations: action.payload };
    case ActionTypes.SortLocations:
      const sortAccending = action.payload.key === state.sortingKey ? !state.sortAccending : false;
      const locations = sortObject([...state.locations], action.payload.key, sortAccending);
      return { ...state, locations, sortAccending, sortingKey: action.payload.key };
    default:
      return state;
  }
}
