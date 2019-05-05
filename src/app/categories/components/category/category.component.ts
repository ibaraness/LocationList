import { CloseConfirmModal, OpenConfirmModal } from './../../../actions/modal.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadCategory, RemoveCategory, ClearCategoryAction, ClearCategoryError, RemovingCategory } from 'src/app/actions/category.actions';
import { Category } from 'src/app/models/locations';
import { selectCategory } from 'src/app/selectors/category.selectors';
import { GetNewCategory, SaveCategory, DisableCategoryEdit } from './../../../actions/category.actions';
import { CategoryState } from './../../../states/state';
import { EnableHeaderEdit } from 'src/app/actions/header.actions';
import { OpenInfoModal } from 'src/app/actions/modal.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category;
  error: boolean;
  errorMessge: string;
  private _editMode: boolean;
  set editMode(editable: boolean) {
    this._editMode = editable;
    this.enableFormGroup(editable);
  }
  get editMode(): boolean {
    return this._editMode;
  }
  subscription: Subscription;
  formGroup: FormGroup;
  private pendingConfirmResponse: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>) { }

  ngOnInit() {
    this.initCategory();
    this.initState();
  }

  private initCategory() {
    const categoryName = this.route.snapshot.paramMap.get('category');
    if (categoryName) {
      this.store.dispatch(new LoadCategory(categoryName));
      return;
    }
    this.store.dispatch(new GetNewCategory());
  }


  cancelEdit() {
    this.updateFormGroup();
    this.store.dispatch(new DisableCategoryEdit());
    this.store.dispatch(new EnableHeaderEdit());
  }

  saveCategory() {
    Object.keys(this.formGroup.value).forEach(key => {
      this.category[key] = this.formGroup.value[key];
      this.store.dispatch(new SaveCategory(this.category));
    });
  }

  private initState(): void {
    this.subscription = this.store.pipe(select(selectCategory)).subscribe((state) => {
      const modal = state.modal;
      if (this.category !== state.category.category) {
        this.category = state.category.category;
        this.initFormGroup();
      }
      this.editMode = state.category.editable;
      if (state.category.pendingRemove) {
        this.store.dispatch(new OpenConfirmModal({
          message: 'Are you sure you eant to delete category?',
          referer: 'category-remove'
        }));
        this.pendingConfirmResponse = true;
        this.store.dispatch(new RemovingCategory());
      }

      if(modal.pendingConfirmResponse && this.pendingConfirmResponse && modal.confirmReferer === 'category-remove'){
        if(modal.confirmApproved){
          this.store.dispatch(new RemoveCategory(this.category));
        }
        this.pendingConfirmResponse = false;
        this.store.dispatch(new CloseConfirmModal());
      }

      if (state.category.pendingError) {
        this.error = true;
        this.errorMessge = state.category.errorMessage;
      }

      if (state.category.actionComplete) {
        if (state.category.lastAction === 'save') {
          this.store.dispatch(new OpenInfoModal({ message: 'Category was saved successfully!' }));
          this.router.navigate(['/categories']);
        }
        if(state.category.lastAction === 'remove') {
          this.store.dispatch(new OpenInfoModal({ message: 'Category was removed successfully!' }));
          this.router.navigate(['/categories']);
        }
        this.store.dispatch(new ClearCategoryError());
        this.store.dispatch(new ClearCategoryAction());
      }
    });
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
    if (!this.category) {
      return;
    }
    if (this.formGroup) {
      this.updateFormGroup();
      return;
    }
    this.createFormGroup();
  }

  private updateFormGroup() {
    Object.keys(this.category)
      .filter(key => key !== 'id')
      .forEach(key => {
        const control = this.formGroup.get(key);
        control.setValue(this.category[key]);
      });
  }

  private createFormGroup() {
    const controls = {};
    Object.keys(this.category)
      .filter(key => key !== 'id')
      .forEach(key => {
        controls[key] = new FormControl({ value: this.category[key], disabled: !this.editMode }, Validators.required);
      });
    this.formGroup = new FormGroup(controls);
  }
}
