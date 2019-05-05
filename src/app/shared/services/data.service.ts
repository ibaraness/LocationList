import { Injectable, OnInit, LOCALE_ID } from '@angular/core';
import { LocationItem, Category } from 'src/app/models/locations';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static LOCATION_ID = 0;
  static CATEGORY_ID = 0;

  constructor(private localStorage: LocalStorageService) { }

  getCategories(): Observable<Category[]> {
    let categories = this.localStorage.get('categories') || [];
    if (!categories.length) {
      categories = [{ id: ++DataService.CATEGORY_ID, name: 'Home' }];
      this.localStorage.set('categories', categories);
    }
    return new Observable(subscriber => {
      subscriber.next(categories);
      subscriber.complete();
    });
  }

  getCategoryByName(name: string): Observable<Category> {
    return new Observable(subscriber => {
      this.getCategories().subscribe(categories => {
        const category = categories.find(cat => cat.name === name);
        subscriber.next(category);
        subscriber.complete();
      });
    });
  }

  removeCategory(category: Category): Observable<boolean> {
    return new Observable(subscriber => {
      this.getCategories().subscribe(categories => {
        const newCategories = categories.filter(cat => cat.name !== category.name);
        this.localStorage.set('categories', newCategories);
        subscriber.next(true);
        subscriber.complete();
      });
    });
  }

  getLocations(): Observable<LocationItem[]> {

    const locations = this.localStorage.get('locations') || [];
    return new Observable(subscriber => {
      subscriber.next([].concat(locations));
      subscriber.complete();
    });
  }

  getBlankLocation(): LocationItem {
    return {
      id: null,
      name: null,
      address: null,
      coordinates: {
        long: null,
        lat: null
      },
      catagories: []
    };
  }

  getBlankCategory(): Category {
    return {
      name: '',
      id: null
    };
  }

  removeLocation(location: LocationItem): Observable<boolean> {
    return new Observable(subscriber => {
      this.getLocations().subscribe((locations: LocationItem[]) => {
        const newLocations = locations.filter(loc => loc.id !== location.id);
        this.localStorage.set('locations', newLocations);
        subscriber.next(true);
        subscriber.complete();
      });
    });
  }

  saveCategory(category: Category): Observable<Category[]> {
    return new Observable(subscriber => {
      this.getCategories().subscribe((categories: Category[]) => {
        if (categories.find(cat => cat.name === category.name && cat.id !== category.id)) {
          subscriber.error('Category name already exist!');
          subscriber.complete();
          return;
        }
        const existIndex = categories.findIndex((cat: Category) => +cat.id === +category.id);
        if (category.id && existIndex >= 0) {
          categories[existIndex] = category;
          this.localStorage.set('categories', categories);
          subscriber.next(categories);
          subscriber.complete();
          return;
        }
        category.id = categories.length
          ? +categories.map(item => item.id).sort().reverse()[0] + 1
          : ++DataService.CATEGORY_ID;
        this.localStorage.set('categories', [...categories, category]);
        subscriber.next(categories);
        subscriber.complete();
      });
    });
  }

  saveLocation(location: LocationItem): Observable<LocationItem> {
    return new Observable(subscriber => {
      this.getLocations().subscribe((locations: LocationItem[]) => {
        if (locations.find(loc => loc.name === location.name && loc.id !== location.id)) {
          subscriber.error('Location name already exist!');
          subscriber.complete();
          return;
        }
        const existIndex = locations.findIndex((loc) => +loc.id === +location.id);
        if (location.id && existIndex >= 0) {
          locations[existIndex] = location;
          this.localStorage.set('locations', locations);
          subscriber.next(location);
          subscriber.complete();
          return;
        }
        location.id = locations.length
          ? +locations.map(item => item.id).sort().reverse()[0] + 1
          : ++DataService.LOCATION_ID;
        this.localStorage.set('locations', [...locations, location]);
        subscriber.next(location);
        subscriber.complete();
      });
    });
  }
}
