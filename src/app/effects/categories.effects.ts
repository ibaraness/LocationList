import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from "../actions/action-type";
import { DataService } from "../shared/services/data.service";

@Injectable()
export class CategoriesEffects {
  @Effect()
  loadCategories$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadCategories),
      mergeMap(
        () => this.dataService.getCategories()
        .pipe(
          map(categories => ({ type: ActionTypes.CategoriesLoaded, payload: categories }))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
