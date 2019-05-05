import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from "../actions/action-type";
import { DataService } from "../shared/services/data.service";

@Injectable()
export class LocationsEffects {
  @Effect()
  loadLocations$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadLocations),
      mergeMap(
        () => this.dataService.getLocations()
        .pipe(
          map(locations => ({ type: ActionTypes.LocationsLoaded, payload: locations }))
        )
      )
    );
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
