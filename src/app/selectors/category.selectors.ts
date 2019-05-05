import { CategoryState } from './../states/state';
import { CategoriesState } from '../states/state';
import { createSelector } from "@ngrx/store";
import { LocationState, RootState } from "../states/state";


export const selectCategory = createSelector(
  (state: RootState) => state,
  (state: RootState) => ({
    category: state.categoryPage,
    modal: state.modal
  })
);
