import { Action } from '@ngrx/store';
import { ActionTypes } from './action-type';
import { LocationItem } from '../models/locations';

export class LoadLocations implements Action {
  readonly type = ActionTypes.LoadLocations;
}

export class LocationsLoaded implements Action {
  readonly type = ActionTypes.LocationsLoaded;
  constructor(public payload: LocationItem[]) {}
}

export class SortLocations implements Action {
  readonly type = ActionTypes.SortLocations;
  constructor(public payload: {key: string}) {}
}

export type LocationsType = LoadLocations | LocationsLoaded | SortLocations;
