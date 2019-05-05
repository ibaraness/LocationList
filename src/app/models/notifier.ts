export enum NotificationType {
  NEW_LOCATION,
  REMOVE_LOCATION,
  EDIT_LOCATION,
  CANCEL_EDIT,
  SAVING_LOCATION,
  PAGE_NAVIGATION
}

export interface Notification {
  type: NotificationType;
  payload?: any;
}
