import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from 'src/app/locations/components/locations/locations.component';
import { LocationComponent } from './../../locations/components/location/location.component';
import { CategoriesComponent } from 'src/app/categories/components/categories/categories.component';
import { CategoryComponent } from 'src/app/categories/components/category/category.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/locations',
    pathMatch: 'full'
  },
  {
    path: 'locations',
    component: LocationsComponent,
    data: {
      pageName: 'Locations'
    }
  },
  {
    path: 'category',
    component: CategoryComponent,
    data: {
      pageName: 'Category'
    }
  },
  {
    path: 'category/:category',
    component: CategoryComponent,
    data: {
      pageName: 'Category'
    }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      pageName: 'Categories'
    }
  },
  {
    path: 'location',
    component: LocationComponent,
    data: {
      pageName: 'Location',
    }
  },
  {
    path: 'location/:location',
    component: LocationComponent,
    data: {
      pageName: 'Location',
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
