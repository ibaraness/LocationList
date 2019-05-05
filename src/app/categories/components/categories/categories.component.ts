import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/locations';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectCategories } from 'src/app/selectors/categories.selectors';
import { LoadCategories } from 'src/app/actions/categories.action';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  orderByKey: string;
  orderAscending: boolean;

  constructor(
    private router: Router,
    private store: Store<any>) { }

  ngOnInit() {
    this.categories$ = this.store.pipe(select(selectCategories));
    this.store.dispatch(new LoadCategories());
  }

  onCategoryClick(name: string){
    this.router.navigate([`/category/${name}`]);
  }

  onClickSort(key){}

}
