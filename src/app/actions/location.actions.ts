import { Action } from '@ngrx/store';
import { ActionTypes } from './action-type';
import { LocationItem } from '../models/locations';

export class GetNewLocation implements Action {
  readonly type = ActionTypes.GetNewLocation;
}

export class NewLocationReady implements Action {
  readonly type = ActionTypes.NewLocationReady;
  constructor(public payload: LocationItem) { }
}

export class LoadLocation implements Action {
  readonly type = ActionTypes.LoadLocation;
  constructor(public payload: number) { }
}

export class LocationLoaded implements Action {
  readonly type = ActionTypes.LocationLoaded;
  constructor(public payload: LocationItem) { }
}

export class SaveLocation implements Action {
  readonly type = ActionTypes.SaveLocation;
  constructor(public payload: LocationItem) { }
}

export class LocationSaved implements Action {
  readonly type = ActionTypes.LocationSaved;
  constructor(public payload: LocationItem) { }
}

export class RemoveLocation implements Action {
  readonly type = ActionTypes.RemoveLocation;
  constructor(public payload: LocationItem) { }
}

export class LocationRemoved implements Action {
  readonly type = ActionTypes.LocationRemoved;
  constructor(public payload: boolean) { }
}

export class EnableLocationEdit implements Action {
  readonly type = ActionTypes.EnableLocationEdit;
}

export class DisableLocationEdit implements Action {
  readonly type = ActionTypes.DisableLocationEdit;
}

export class TriggerLocationRemove implements Action {
  readonly type = ActionTypes.TriggerLocationRemove;
}

export class LocationNotificationEnd implements Action {
  readonly type = ActionTypes.LocationNotificationEnd;
}

export class LocationError implements Action {
  readonly type = ActionTypes.LocationError;
  constructor(public payload: string) { }
}

export class RemovingLocation implements Action {
  readonly type = ActionTypes.RemovingLocation;
}

export class ClearLocationAction implements Action {
  readonly type = ActionTypes.ClearLocationAction;
}

export class ClearLocationError implements Action {
  readonly type = ActionTypes.ClearLocationError;
}

export type LocationType = GetNewLocation | NewLocationReady | LoadLocation
  | LocationLoaded | EnableLocationEdit | DisableLocationEdit | SaveLocation
  | LocationSaved | RemoveLocation | LocationRemoved | TriggerLocationRemove
  | LocationNotificationEnd | RemovingLocation | ClearLocationAction
  | ClearLocationError | LocationError;
