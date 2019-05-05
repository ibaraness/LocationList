import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { RoutingModule } from './core/routing/routing.module';
import { CategoriesEffects } from './effects/categories.effects';
import { LocationEffects } from './effects/location.effects';
import { LocationsEffects } from './effects/locations.effects';
import { LocationComponent } from './locations/components/location/location.component';
import { LocationsComponent } from './locations/components/locations/locations.component';
import { pageNameReducer } from './reducres/app.reducer';
import { categoriesReducer } from './reducres/categories.reducer';
import { headerReducer } from './reducres/header.reducer';
import { locationReducer } from './reducres/location.reducer';
import { locationsReducer } from './reducres/locations.reducer';
import { HeaderComponent } from './shared/components/header/header.component';
import { TagsControlComponent } from './shared/components/tags-control/tags-control.component';
import { CategoriesComponent } from './categories/components/categories/categories.component';
import { CategoryComponent } from './categories/components/category/category.component';
import { categoryReducer } from './reducres/category.reducer';
import { CategoryEffects } from './effects/category.effects';
import { FooterComponent } from './shared/components/footer/footer.component';
import { InfoModalComponent } from './shared/components/info-modal/info-modal.component';
import { modalReducer } from './reducres/modal.reducer';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { MapboxComponent } from './shared/components/mapbox/mapbox.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationComponent,
    LocationsComponent,
    TagsControlComponent,
    CategoriesComponent,
    CategoryComponent,
    FooterComponent,
    InfoModalComponent,
    ConfirmModalComponent,
    MapboxComponent
  ],
  entryComponents: [InfoModalComponent, ConfirmModalComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    EffectsModule.forRoot([
      LocationsEffects,
      LocationEffects,
      CategoriesEffects,
      CategoryEffects
    ]),
    StoreModule.forRoot({
      locationPage: locationReducer,
      locationsPage: locationsReducer,
      categoriesPage: categoriesReducer,
      categoryPage: categoryReducer,
      header: headerReducer,
      pageName: pageNameReducer,
      router: routerReducer,
      modal: modalReducer
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
