import { Category } from 'src/app/models/locations';
import { LocationItem } from "../models/locations";

export interface LocationsState {
  locations: LocationItem[];
  sortingKey: string;
  sortAccending: boolean;
}

export interface HeaderState {
  editEnabled: boolean;
  addEnabled: boolean;
  removeEnables: boolean;
}

export interface CategoriesState {
  categories: Category[];
  sortingKey: string;
  sortAccending: boolean;
}

export interface LocationState {
  location: LocationItem;
  editable: boolean;
  pendingRemove: boolean;
  actionComplete: boolean;
  lastAction: string;
  pendingError: boolean;
  errorMessage: string;
}

export interface CategoryState {
  category: Category;
  editable: boolean;
  pendingRemove: boolean;
  actionComplete: boolean;
  lastAction: string;
  pendingError: boolean;
  errorMessage: string;
}

export interface ModalState {
  pendingModal: boolean;
  modalInfo: string;
  pendingConfirmModal: boolean;
  confirmInfo: string;
  confirmReferer: string;
  pendingConfirmResponse: boolean;
  confirmApproved: boolean;
}

export interface RootState {
  locationsPage: LocationsState;
  locationPage: LocationState;
  categoriesPage: CategoriesState;
  categoryPage: CategoryState;
  pageName: string;
  modal: ModalState;
  header: HeaderState;
  router: any;
}
