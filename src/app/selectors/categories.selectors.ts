import { CategoriesState } from '../states/state';
import { createSelector } from "@ngrx/store";
import { LocationState, RootState } from "../states/state";

const selectCategoriesPage = (state: RootState) => state.categoriesPage;

export const selectCategories = createSelector(
  selectCategoriesPage,
  (state: CategoriesState) => state.categories
);
