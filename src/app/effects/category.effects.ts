import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActionTypes } from "../actions/action-type";
import { DataService } from "../shared/services/data.service";
import { LoadCategory, RemoveCategory, SaveCategory } from "../actions/category.actions";
import { of } from "rxjs";

@Injectable()
export class CategoryEffects {
  @Effect()
  newCategory$ = this.actions$
    .pipe(
      ofType(ActionTypes.GetNewCategory),
      mergeMap(
        () => of(this.dataService.getBlankCategory())
          .pipe(
            map(location => ({ type: ActionTypes.NewCategoryReady, payload: location }))
          )
      )
    );

  @Effect()
  loadCategory$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadCategory),
      mergeMap(
        (action: LoadCategory) => this.dataService.getCategoryByName(action.payload)
        .pipe(
          map(category => ({ type: ActionTypes.CategoryLoaded, payload: category }))
        )
      )
    );

  @Effect()
  saveCategory$ = this.actions$
    .pipe(
      ofType(ActionTypes.SaveCategory),
      mergeMap(
        (action: SaveCategory) => this.dataService.saveCategory(action.payload)
        .pipe(
          map(categories => ({ type: ActionTypes.CategorySaved, payload: categories })),
          catchError(error => of(({ type: ActionTypes.CategoryError, payload: error })))
        )
      )
    );

  @Effect()
  removeCategory$ = this.actions$
    .pipe(
      ofType(ActionTypes.RemoveCategory),
      mergeMap(
        (action: RemoveCategory) => this.dataService.removeCategory(action.payload)
        .pipe(
          map(categories => ({ type: ActionTypes.CategoryRemoved, payload: categories }))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
