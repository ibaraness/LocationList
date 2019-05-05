import { createSelector } from "@ngrx/store";
import { RootState, LocationsState } from "../states/state";

const selectLocationsPage = (state: RootState) => state.locationsPage;

export const selectLocationsPageState = createSelector(
  selectLocationsPage,
  (state: LocationsState) => state
);

export const selectLocations = createSelector(
  selectLocationsPage,
  (state: LocationsState) => state.locations
);

export const selectSortingKey = createSelector(
  selectLocationsPage,
  (state: LocationsState) => state.sortingKey
);

export const selectSortAccending = createSelector(
  selectLocationsPage,
  (state: LocationsState) => state.sortAccending
);
