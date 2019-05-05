import { ActionTypes } from "../actions/action-type";
import { ModalType } from "../actions/modal.actions";
import { ModalState } from "../states/state";

const initialState: ModalState = {
  pendingModal: false,
  modalInfo: '',
  pendingConfirmModal: false,
  confirmInfo: '',
  confirmReferer: '',
  pendingConfirmResponse: false,
  confirmApproved: false
};

export function modalReducer(state: ModalState = initialState, action: ModalType): any {
  switch (action.type) {
    case ActionTypes.OpenInfoModal:
      return { ...state, pendingModal: true, modalInfo: action.payload.message };
    case ActionTypes.CloseInfoModal:
      return { ...state, pendingModal: false, modalInfo: '' };
    case ActionTypes.OpenConfirmModal:
      return {
        ...state,
        pendingConfirmModal: true,
        confirmInfo: action.payload.message,
        confirmReferer: action.payload.referer
      };
    case ActionTypes.ConfirmModalCancel:
      return {
        ...state,
        pendingConfirmModal: false,
        pendingConfirmResponse: true,
        confirmApproved: false
      };
    case ActionTypes.ConfirmModalConfirm:
      return {
        ...state,
        pendingConfirmModal: false,
        pendingConfirmResponse: true,
        confirmApproved: true
      };
    case ActionTypes.CloseConfirmModal:
      return {
        ...state,
        pendingConfirmResponse: false,
        confirmApproved: false,
        confirmInfo: '',
        confirmReferer: ''
      };
    default:
      return state;
  }
}
