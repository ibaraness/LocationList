import { TriggerCategoryRemove } from './../../../actions/category.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisableHeaderEdit } from 'src/app/actions/header.actions';
import { EnableLocationEdit, TriggerLocationRemove } from 'src/app/actions/location.actions';
import { selectHeaderAdd, selectHeaderEdit, selectHeaderRemove } from './../../../selectors/header.selectors';
import { EnableCategoryEdit } from 'src/app/actions/category.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string;
  editEnabled$: Observable<boolean>;
  addEnabled$: Observable<boolean>;
  removeEnabled$: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {

    this.editEnabled$ = this.store.pipe(select(selectHeaderEdit));
    this.addEnabled$ = this.store.pipe(select(selectHeaderAdd));
    this.removeEnabled$ = this.store.pipe(select(selectHeaderRemove));
    this.store.subscribe(state => {
      this.title = state.pageName;
    });
  }

  add() {
    if (this.title === 'Locations' || this.title === 'Location') {
      this.router.navigate(['/location/']);
    }
    if(this.title === 'Category'  || this.title === 'Categories'){
      this.router.navigate(['/category/']);
    }
  }

  edit() {
    if (this.title === 'Location') {
      this.store.dispatch(new EnableLocationEdit());
      this.store.dispatch(new DisableHeaderEdit());
    }
    if(this.title === 'Category'){
      this.store.dispatch(new EnableCategoryEdit());
      this.store.dispatch(new DisableHeaderEdit());
    }
  }

  remove() {
    if (this.title === 'Location') {
      this.store.dispatch(new TriggerLocationRemove());
    }
    if(this.title === 'Category') {
      this.store.dispatch(new TriggerCategoryRemove());
    }
  }

}
