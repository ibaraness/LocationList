import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/locations';
import { ActionTypes } from './action-type';

export class LoadCategories implements Action {
  readonly type = ActionTypes.LoadCategories;
}

export class CategoriesLoaded implements Action {
  readonly type = ActionTypes.CategoriesLoaded;
  constructor(public payload: Category[]) { }
}

export type CategoriesType = LoadCategories | CategoriesLoaded;
