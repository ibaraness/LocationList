import { HeaderState } from './../states/state';
import { createSelector } from "@ngrx/store";
import { RootState, LocationsState } from "../states/state";

const selectHeader = (state: RootState) => state.header;
const selectRoot = (state: RootState) => state;

export const selectHeaderTitle = createSelector(
  selectRoot,
  (state: RootState) => state.pageName
);

export const selectHeaderEdit = createSelector(
  selectHeader,
  (state: HeaderState) => state.editEnabled
);

export const selectHeaderAdd = createSelector(
  selectHeader,
  (state: HeaderState) => state.addEnabled
);

export const selectHeaderRemove = createSelector(
  selectHeader,
  (state: HeaderState) => state.removeEnables
);
