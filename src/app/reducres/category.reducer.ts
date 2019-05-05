import { ActionTypes } from "../actions/action-type";
import { CategoryType } from "../actions/category.actions";
import { CategoryState } from "../states/state";

const initialState: CategoryState = {
  category: null,
  editable: false,
  pendingRemove: false,
  actionComplete: false,
  lastAction: '',
  pendingError: false,
  errorMessage: ''
};

export function categoryReducer(state: CategoryState = initialState, action: CategoryType): any {
  switch (action.type) {
    case ActionTypes.CategoryLoaded:
      return {...state, category: action.payload, editable: false};
    case ActionTypes.RemovingCategory:
      return { ...state, pendingRemove: false};
    case ActionTypes.CategoryRemoved:
      return { ...state, pendingRemove: false, actionComplete: true, lastAction: 'remove'};
    case ActionTypes.TriggerCategoryRemove:
      return { ...state, pendingRemove: true};
    case ActionTypes.NewCategoryReady:
      return { ...state, category: action.payload, editable: true};
    case ActionTypes.CategorySaved:
      return { ...state, location: action.payload, editable: false, actionComplete: true, lastAction: 'save'};
    case ActionTypes.EnableCategoryEdit:
      return { ...state, editable: true};
    case ActionTypes.DisableCategoryEdit:
      return { ...state, editable: false};
    case ActionTypes.CategoryError:
      return { ...state, pendingError: true, errorMessage: action.payload };
    case ActionTypes.ClearCategoryError:
      return { ...state, pendingError: false };
    case ActionTypes.ClearCategoryAction:
      return { ...state, actionComplete: false, lastAction: '' };
    default:
      return state;
  }
}
