export enum ActionTypes {
  GetNewLocation = '[Location Page] GetNewLocation',
  LoadLocation = '[Location Page] LoadLocation',
  LocationLoaded = '[Location Page] LocationLoaded',

  SaveLocation = '[Location Page] SaveLocation',
  LocationSaved = '[Location Page] LocationSaved',

  NewLocationReady = '[Location Page] NewLocationReady',
  TriggerLocationRemove = '[Location Page] TriggerLocationRemove',
  RemoveLocation = '[Location Page] RemoveLocation',
  RemovingLocation = '[Category] RemovingLocation',
  LocationRemoved = '[Location Page] LocationRemoved',
  EnableLocationEdit = '[Location Page] EnableLocationEdit',
  DisableLocationEdit = '[Location Page] DisableLocationEdit',
  LocationNotificationEnd = '[Location Page] LocationNotificationEnd',
  ClearLocationAction = '[Location Page] ClearLocationAction',
  ClearLocationError = '[Location Page] ClearLocationError',
  LocationError = '[Location Page] LocationError',

  LoadLocations = '[Locations Page] LoadLocations',
  LocationsLoaded = '[Locations Page] LocationsLoaded',
  SortLocations = '[Locations Page] SortLocations',

  LoadCategories = '[App] LoadCategories',
  CategoriesLoaded = '[App] categoriesLoaded',

  SaveCategory = '[App] SaveCategory',
  CategorySaved = '[App] CategorySaved',
  CategoryError = '[Category Page] CategoryError',
  ClearCategoryError = '[Category Page] ClearCategoryError',
  GetNewCategory = '[Category Page] GetNewCategory',
  NewCategoryReady = '[Category Page] NewCategoryReady',
  LoadCategory = '[Category] LoadCategory',
  CategoryLoaded = '[Category] CategoryLoaded',
  RemoveCategory = '[Category] RemoveCategory',
  RemovingCategory = '[Category] RemovingCategory',
  CategoryRemoved = '[Category] CategoryRemoved',
  TriggerCategoryRemove = '[Category] TriggerCategoryRemove',
  EnableCategoryEdit = '[Category Page] EnableCategoryEdit',
  DisableCategoryEdit = '[Category Page] DisableCategoryEdit',
  ClearCategoryAction = '[Category Page] ClearCategoryAction',

  DisableHeaderEdit = '[Header] DisableHeaderEdit',
  DisableHeaderAdd = '[Header] DisableHeaderAdd',
  DisableHeaderRemove = '[Header] DisableHeaderRemove',

  EnableHeaderEdit = '[Header] EnableHeaderEdit',
  EnableHeaderAdd = '[Header] EnableHeaderAdd',
  EnableHeaderRemove = '[Header] EnableHeaderRemove',

  SetPageName = '[App] SetPageName',

  OpenInfoModal = '[App] OpenInfoModal',
  CloseInfoModal = '[App] CloseInfoModal',
  OpenConfirmModal = '[App] OpenConfirmModal',
  ConfirmModalConfirm = '[App] ConfirmModalConfirm',
  ConfirmModalCancel = '[App] ConfirmModalCancel',
  CloseConfirmModal = '[App] CloseConfirmModal'
}

