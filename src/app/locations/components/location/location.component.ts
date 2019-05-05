import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EnableHeaderEdit } from 'src/app/actions/header.actions';
import { GetNewLocation, LoadLocation, SaveLocation } from 'src/app/actions/location.actions';
import { CloseConfirmModal, OpenConfirmModal, OpenInfoModal } from 'src/app/actions/modal.actions';
import { Category, LocationItem } from 'src/app/models/locations';
import { selectLocationRelated } from 'src/app/selectors/location.selectors';
import { mapObject } from 'src/app/shared/utils/mapping';
import { locationItemMapper } from '../../config/location-item-mapper';
import {
  ClearLocationAction,
  ClearLocationError,
  DisableLocationEdit,
  RemoveLocation,
  RemovingLocation
} from './../../../actions/location.actions';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {

  location: LocationItem;
  categories: Category[];
  subscription: Subscription;
  error: boolean;
  errorMessge: string;
  showMap: boolean;

  private _editMode: boolean;
  set editMode(editable: boolean) {
    this._editMode = editable;
    this.enableFormGroup(editable);
  }
  get editMode(): boolean {
    return this._editMode;
  }

  formGroup: FormGroup;
  selectedCategory: Category;
  private pendingConfirmResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>) { }

  ngOnInit() {
    this.initState();
    this.initLocation();
    this.store.dispatch(new ClearLocationError());
  }

  private initState(): void {
    this.subscription = this.store.pipe(select(selectLocationRelated)).subscribe((state: any) => {
      const modal = state.modal;
      if (this.location !== state.location || this.categories !== state.categories) {
        this.location = state.location;
        this.categories = state.categories;
        this.initFormGroup();
      }
      this.editMode = state.editable;

      if (state.pendingRemove) {
        this.store.dispatch(new OpenConfirmModal({
          message: 'Are you sure you eant to delete location?',
          referer: 'location-remove'
        }));
        this.pendingConfirmResponse = true;
        this.store.dispatch(new RemovingLocation());
      }

      if (modal.pendingConfirmResponse && this.pendingConfirmResponse && modal.confirmReferer === 'location-remove') {
        if (modal.confirmApproved) {
          this.store.dispatch(new RemoveLocation(this.location));
        }
        this.pendingConfirmResponse = false;
        this.store.dispatch(new CloseConfirmModal());
      }

      if (state.locationPage.pendingError) {
        this.error = true;
        this.errorMessge = state.locationPage.errorMessage;
      }

      if (state.locationPage.actionComplete) {
        const message = state.locationPage.lastAction === 'save'
          ? 'Location was saved successfully!' : 'Location was removed successfully!';
        this.store.dispatch(new OpenInfoModal({ message }));
        this.router.navigate(['/locations']);
        this.store.dispatch(new ClearLocationError());
        this.store.dispatch(new ClearLocationAction());
      }
    });
  }

  private initLocation() {
    const locationID = this.route.snapshot.paramMap.get('location');
    if (locationID) {
      this.store.dispatch(new LoadLocation(+locationID));
      return;
    }
    this.store.dispatch(new GetNewLocation());
  }

  updateFromMap({ long, lat }): void {
    this.formGroup.get('long').setValue(long);
    this.formGroup.get('lat').setValue(lat);
  }

  saveLocation(): void {
    const locationValues = this.formGroup.value;
    Object.keys(locationValues).forEach(key => {
      if (key === 'long' || key === 'lat') {
        this.location.coordinates[key] = locationValues[key];
        return;
      } else if (key === 'catagories') {
        this.location.catagories = this.categories
          .filter(cat => {
            return (<number[]>locationValues[key]).find(id => id === cat.id);
          });
        return;
      }
      this.location[key] = locationValues[key];
    });
    this.store.dispatch(new SaveLocation(this.location));
    this.store.dispatch(new EnableHeaderEdit());
  }

  cancelEdit() {
    this.updateFormGroup();
    this.store.dispatch(new DisableLocationEdit());
    this.store.dispatch(new EnableHeaderEdit());
  }

  addCategory(category: Category): void {
    const categories = this.formGroup.get('catagories');
    const exist = categories.value.find((id: number) => +id === +category.id);
    if (exist) {
      return;
    }
    categories.setValue([...categories.value, category.id]);
  }

  private enableFormGroup(enable = true): void {
    if (this.formGroup && enable) {
      this.formGroup.enable();
      return;
    } else if (this.formGroup) {
      this.formGroup.disable();
    }
  }

  private initFormGroup() {
    if (!this.location || !this.categories) {
      return;
    }
    if (this.formGroup) {
      this.updateFormGroup();
      return;
    }
    this.createFormGroup();
  }

  private updateFormGroup() {
    const formInitialFieldValues = mapObject(locationItemMapper, this.location);
    formInitialFieldValues.forEach(({ key, value }) => {
      const control = this.formGroup.get(key);
      control.setValue(value)
    });
  }

  private createFormGroup() {
    const controls = {};
    const formInitialFieldValues = mapObject(locationItemMapper, this.location);
    formInitialFieldValues.forEach(({ key, value }) => {
      controls[key] = new FormControl({ value, disabled: !this.editMode }, Validators.required);
    });
    this.formGroup = new FormGroup(controls);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
