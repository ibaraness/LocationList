import { ActionTypes } from "../actions/action-type";
import { CategoriesType } from "../actions/categories.action";
import { AppType } from "../actions/app.action";

const initialState: { pageName: string , modal: string } = {
  pageName: '',
  modal: ''
};

export function pageNameReducer(state = initialState, action: AppType): any {
  switch (action.type) {
    case ActionTypes.SetPageName:
      return action.payload;
    default:
      return state;
  }
}
