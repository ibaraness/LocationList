import { createSelector } from "@ngrx/store";
import { LocationState, RootState } from "../states/state";

const selectLocationPage = (state: RootState) => state.locationPage;

export const selectLocation = createSelector(
  selectLocationPage,
  (state: LocationState) => state.location
);

export const selectLocationRelated = createSelector(
  (state: RootState) => state,
  (state: RootState) => ({
    location: state.locationPage.location,
    editable: state.locationPage.editable,
    categories: state.categoriesPage && state.categoriesPage.categories,
    pendingRemove: state.locationPage.pendingRemove,
    locationPage: state.locationPage,
    modal: state.modal
  })
);
