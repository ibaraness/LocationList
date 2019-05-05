import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoadLocations, SortLocations } from 'src/app/actions/locations.actions';
import { LocationItem, Category } from 'src/app/models/locations';
import { selectLocations, selectLocationsPageState } from 'src/app/selectors/locations.selectors';
import { LocationsState } from 'src/app/states/state';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy {

  locations$: Observable<LocationItem[]>;
  orderByKey: string;
  orderAscending: boolean;

  private subscription: Subscription;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.locations$ = this.store.pipe(select(selectLocations));
    this.subscription = this.store.pipe(select(selectLocationsPageState)).subscribe((state: LocationsState) => {
      this.orderByKey = state.sortingKey;
      this.orderAscending = state.sortAccending;
    });
    this.store.dispatch(new LoadLocations());
  }

  onLocationClick(id: number): void {
    this.router.navigate([`/location/${id}`]);
  }

  onClickSort(key: string) {
    this.store.dispatch(new SortLocations({ key }));
  }

  getCatagoryNames(categories: Category[]){
    return categories.map(cat => cat.name);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
