import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/locations';
import { ActionTypes } from './action-type';

export class LoadCategory implements Action {
  readonly type = ActionTypes.LoadCategory;
  constructor(public payload: string) { }
}

export class CategoryLoaded implements Action {
  readonly type = ActionTypes.CategoryLoaded;
  constructor(public payload: Category) { }
}

export class RemoveCategory implements Action {
  readonly type = ActionTypes.RemoveCategory;
  constructor(public payload: Category) { }
}

export class CategoryRemoved implements Action {
  readonly type = ActionTypes.CategoryRemoved;
  constructor(public payload: boolean) { }
}

export class TriggerCategoryRemove implements Action {
  readonly type = ActionTypes.TriggerCategoryRemove;
}

export class GetNewCategory implements Action {
  readonly type = ActionTypes.GetNewCategory;
}

export class NewCategoryReady implements Action {
  readonly type = ActionTypes.NewCategoryReady;
  constructor(public payload: Category) { }
}

export class EnableCategoryEdit implements Action {
  readonly type = ActionTypes.EnableCategoryEdit;
}

export class DisableCategoryEdit implements Action {
  readonly type = ActionTypes.DisableCategoryEdit;
}

export class SaveCategory implements Action {
  readonly type = ActionTypes.SaveCategory;
  constructor(public payload: Category) { }
}

export class CategorySaved implements Action {
  readonly type = ActionTypes.CategorySaved;
  constructor(public payload: Category[]) { }
}

export class CategoryError implements Action {
  readonly type = ActionTypes.CategoryError;
  constructor(public payload: string) { }
}

export class ClearCategoryAction implements Action {
  readonly type = ActionTypes.ClearCategoryAction;
}

export class ClearCategoryError implements Action {
  readonly type = ActionTypes.ClearCategoryError;
}

export class RemovingCategory implements Action {
  readonly type = ActionTypes.RemovingCategory;
}

export type CategoryType = LoadCategory | CategoryLoaded
  | RemoveCategory | CategoryRemoved | TriggerCategoryRemove
  | NewCategoryReady | EnableCategoryEdit | DisableCategoryEdit
  | SaveCategory | CategorySaved | CategoryError
  | ClearCategoryAction | ClearCategoryError | RemovingCategory;
