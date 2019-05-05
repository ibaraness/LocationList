import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActionTypes } from "../actions/action-type";
import { LoadLocation, RemoveLocation, SaveLocation } from "../actions/location.actions";
import { DataService } from "../shared/services/data.service";

@Injectable()
export class LocationEffects {
  @Effect()
  newLocation$ = this.actions$
    .pipe(
      ofType(ActionTypes.GetNewLocation),
      mergeMap(
        () => of(this.dataService.getBlankLocation())
          .pipe(
            map(location => ({ type: ActionTypes.NewLocationReady, payload: location }))
          )
      )
    );

  @Effect()
  loadLocation$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadLocation),
      mergeMap(
        (action: LoadLocation) => this.dataService.getLocations()
          .pipe(
            map(locations => ({
              type: ActionTypes.LocationLoaded,
              payload: locations.find(location => +location.id === action.payload)
                || this.dataService.getBlankLocation()
            }))
          )
      )
    );
  @Effect()
  saveLocation$ = this.actions$
    .pipe(
      ofType(ActionTypes.SaveLocation),
      mergeMap(
        (action: SaveLocation) => this.dataService.saveLocation(action.payload)
          .pipe(
            map(location => ({
              type: ActionTypes.LocationSaved,
              payload: location
            })),
            catchError(error => of(({ type: ActionTypes.LocationError, payload: error })))
          )
      )
    );

  @Effect()
  removeLocation$ = this.actions$
    .pipe(
      ofType(ActionTypes.RemoveLocation),
      mergeMap(
        (action: RemoveLocation) => this.dataService.removeLocation(action.payload)
          .pipe(
            map(location => ({
              type: ActionTypes.LocationRemoved,
              payload: location
            }))
          )
      )
    );
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
