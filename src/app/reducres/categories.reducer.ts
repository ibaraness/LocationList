import { ActionTypes } from "../actions/action-type";
import { CategoriesType } from "../actions/categories.action";
import { Category } from "../models/locations";
import { CategoriesState } from "../states/state";

const initialState: CategoriesState = {
  categories: [],
  sortingKey: '',
  sortAccending: false
};

export function categoriesReducer(state: CategoriesState = initialState, action: CategoriesType): any {
  switch (action.type) {
    case ActionTypes.CategoriesLoaded:
      return {...state, categories:action.payload};
    default:
      return state;
  }
}
